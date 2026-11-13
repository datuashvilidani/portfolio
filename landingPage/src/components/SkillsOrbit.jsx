import { useEffect, useRef } from "react";

/*
 * Skills orbiting an invisible sun.
 *
 * Every orbit is a real circle in 3D space: it is tilted around the
 * screen's Z axis, then the "camera" looks down on the system from a
 * slight pitch, and a perspective projection turns it into the ellipse
 * you see. Skills get bigger, darker and sharper as they swing towards
 * the viewer and fade / blur as they pass behind the sun.
 */

const ORBITS = [
    { items: ["HTML", "CSS", "JavaScript"], radius: 0.4, speed: 0.34, tilt: -16, phase: 10 },
    { items: ["React", "Tailwind CSS", "Node.js"], radius: 0.7, speed: 0.22, tilt: 10, phase: 75 },
    { items: ["Python", "Django", "SQL"], radius: 1, speed: 0.15, tilt: -5, phase: 140 },
];

const DEG = Math.PI / 180;
const BASE_PITCH = 0.5;
// how far the system can be tipped: slightly from below up to almost top-down
const MIN_PITCH = -0.7;
const MAX_PITCH = 1.5;
const DRAG_SENSITIVITY = 0.008;
const PATH_STEPS = 96;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function buildOrbits(technologies) {
    const placed = new Set(ORBITS.flatMap((orbit) => orbit.items));
    const extra = technologies.filter((name) => !placed.has(name));

    return ORBITS.map((orbit, index) => ({
        ...orbit,
        items: [
            ...orbit.items.filter((name) => technologies.includes(name)),
            // anything new added to the list joins the outer orbit
            ...(index === ORBITS.length - 1 ? extra : []),
        ],
    }));
}

export default function SkillsOrbit({ technologies }) {
    const stageRef = useRef(null);
    const nodeRefs = useRef([]);
    const frontPathRefs = useRef([]);
    const backPathRefs = useRef([]);
    const hoveredRef = useRef(false);
    const hintRef = useRef(null);

    const orbits = buildOrbits(technologies);
    const nodes = orbits.flatMap((orbit, orbitIndex) =>
        orbit.items.map((name, itemIndex) => ({ name, orbitIndex, itemIndex })),
    );

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return undefined;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        let width = 0;
        let height = 0;
        let maxRadius = 0;
        let focal = 0;

        // final camera used for projection = the user's view + a small
        // mouse parallax offset on top
        const camera = { yaw: 0, pitch: BASE_PITCH };

        // the view the visitor grabs and spins
        const view = {
            yaw: 0,
            pitch: BASE_PITCH,
            velocityYaw: 0,
            velocityPitch: 0,
            resetting: false,
        };

        const parallax = { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0 };

        const drag = {
            active: false,
            pointerId: null,
            lastX: 0,
            lastY: 0,
            lastTime: 0,
        };

        let time = 0;
        let speed = 1;
        let last = 0;
        let frame = 0;
        let running = false;
        let basePitch = BASE_PITCH;

        const applyCamera = () => {
            camera.yaw = view.yaw + parallax.yaw;
            camera.pitch = clamp(view.pitch + parallax.pitch, MIN_PITCH, MAX_PITCH);
        };

        const measure = () => {
            width = stage.clientWidth;
            height = stage.clientHeight;
            const isSmall = width < 640;
            const sidePadding = isSmall ? 70 : 170;

            // on narrow screens look further down on the system so the
            // orbits open up vertically instead of piling on top of each other
            const nextPitch = isSmall ? 0.95 : BASE_PITCH;
            if (nextPitch !== basePitch) {
                basePitch = nextPitch;
                view.pitch = basePitch;
                applyCamera();
            }

            maxRadius = Math.max(
                60,
                Math.min(
                    (width - sidePadding) / 2,
                    height * (isSmall ? 0.5 : 0.72),
                    520,
                ),
            );
            focal = maxRadius * 3.2;
        };

        // Orbit-plane angle -> projected screen point
        const project = (orbit, angle, radius) => {
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            // orbit inclination (rotate around Z)
            const tilt = orbit.tilt * DEG;
            const x1 = x * Math.cos(tilt);
            const y1 = x * Math.sin(tilt);

            // camera yaw (rotate around Y)
            const cosYaw = Math.cos(camera.yaw);
            const sinYaw = Math.sin(camera.yaw);
            const x2 = x1 * cosYaw + z * sinYaw;
            const z2 = -x1 * sinYaw + z * cosYaw;

            // camera pitch, looking down on the system (rotate around X)
            const cosPitch = Math.cos(camera.pitch);
            const sinPitch = Math.sin(camera.pitch);
            const y3 = y1 * cosPitch - z2 * sinPitch;
            const z3 = y1 * sinPitch + z2 * cosPitch;

            const scale = focal / (focal - z3);

            return {
                x: width / 2 + x2 * scale,
                y: height / 2 - y3 * scale,
                z: z3,
                scale,
            };
        };

        const render = () => {
            // Tipping towards a top-down view makes the orbits taller;
            // zoom out just enough to keep the whole system in the stage
            const verticalReach = Math.abs(Math.sin(camera.pitch)) + 0.18;
            const fit = Math.min(1, (height * 0.5) / (maxRadius * verticalReach));
            const systemRadius = maxRadius * fit;

            orbits.forEach((orbit, orbitIndex) => {
                const radius = orbit.radius * systemRadius;

                // Orbit path: front half solid, back half faint and dashed
                const points = [];
                for (let step = 0; step <= PATH_STEPS; step += 1) {
                    points.push(project(orbit, (step / PATH_STEPS) * Math.PI * 2, radius));
                }

                let front = "";
                let back = "";
                let frontEnd = -1;
                let backEnd = -1;

                for (let step = 1; step < points.length; step += 1) {
                    const a = points[step - 1];
                    const b = points[step];
                    const isFront = (a.z + b.z) / 2 >= 0;
                    const segment = `L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
                    const start = `M${a.x.toFixed(1)} ${a.y.toFixed(1)}`;

                    if (isFront) {
                        front += (frontEnd === step - 1 ? "" : start) + segment;
                        frontEnd = step;
                    } else {
                        back += (backEnd === step - 1 ? "" : start) + segment;
                        backEnd = step;
                    }
                }

                frontPathRefs.current[orbitIndex]?.setAttribute("d", front);
                backPathRefs.current[orbitIndex]?.setAttribute("d", back);
            });

            nodes.forEach((node, index) => {
                const element = nodeRefs.current[index];
                if (!element) return;

                const orbit = orbits[node.orbitIndex];
                const angle =
                    orbit.phase * DEG +
                    (node.itemIndex / orbit.items.length) * Math.PI * 2 +
                    time * orbit.speed;

                const point = project(orbit, angle, orbit.radius * systemRadius);
                const depth = clamp((point.z / systemRadius + 1) / 2);

                const scale = point.scale * (0.78 + 0.26 * depth);
                const blur = clamp((0.5 - depth) / 0.5) * 1.4;
                const fill = clamp((depth - 0.8) / 0.12);

                element.style.transform = `translate3d(${point.x.toFixed(2)}px, ${point.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(4)})`;
                element.style.opacity = (0.32 + 0.68 * depth).toFixed(3);
                element.style.filter = blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : "none";
                element.style.zIndex = String(Math.round(point.z + 2000));
                element.style.setProperty("--fill", fill.toFixed(3));
            });
        };

        const tick = (now) => {
            const delta = Math.min(0.05, (now - last) / 1000);
            last = now;

            // ease the whole system to a slow drift while a skill is hovered
            const slowDown = hoveredRef.current && !drag.active;
            speed += ((slowDown ? 0.12 : 1) - speed) * 0.06;
            time += delta * speed;

            if (!drag.active) {
                if (view.resetting) {
                    // ease back to the starting view (nearest full turn)
                    const homeYaw = Math.round(view.yaw / (Math.PI * 2)) * Math.PI * 2;
                    view.yaw += (homeYaw - view.yaw) * 0.08;
                    view.pitch += (basePitch - view.pitch) * 0.08;

                    if (
                        Math.abs(homeYaw - view.yaw) < 0.001 &&
                        Math.abs(basePitch - view.pitch) < 0.001
                    ) {
                        view.resetting = false;
                    }
                } else {
                    // momentum after letting go, slowly losing speed
                    view.yaw += view.velocityYaw;
                    view.pitch = clamp(
                        view.pitch + view.velocityPitch,
                        MIN_PITCH,
                        MAX_PITCH,
                    );
                    view.velocityYaw *= 0.95;
                    view.velocityPitch *= 0.9;
                }
            }

            parallax.yaw += (parallax.targetYaw - parallax.yaw) * 0.05;
            parallax.pitch += (parallax.targetPitch - parallax.pitch) * 0.05;
            applyCamera();

            render();
            frame = requestAnimationFrame(tick);
        };

        const start = () => {
            if (running || reduceMotion) return;
            running = true;
            last = performance.now();
            frame = requestAnimationFrame(tick);
        };

        const stop = () => {
            running = false;
            cancelAnimationFrame(frame);
        };

        measure();
        render();

        const resizeObserver = new ResizeObserver(() => {
            measure();
            if (!running) render();
        });
        resizeObserver.observe(stage);

        // only animate while the orbit is on screen
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { threshold: 0 },
        );
        visibilityObserver.observe(stage);

        // without the animation loop (reduced motion) redraw on demand
        const redrawIfIdle = () => {
            if (running) return;
            applyCamera();
            render();
        };

        // Grab and spin: horizontal drag spins the system around,
        // vertical drag tips it towards a top-down or underside view
        const handlePointerDown = (event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;

            drag.active = true;
            drag.pointerId = event.pointerId;
            drag.lastX = event.clientX;
            drag.lastY = event.clientY;
            drag.lastTime = performance.now();

            view.velocityYaw = 0;
            view.velocityPitch = 0;
            view.resetting = false;
            parallax.targetYaw = 0;
            parallax.targetPitch = 0;

            stage.setPointerCapture(event.pointerId);
            stage.classList.add("is-dragging");
            hintRef.current?.classList.add("is-hidden");
        };

        const handlePointerMove = (event) => {
            if (drag.active && event.pointerId === drag.pointerId) {
                const dx = event.clientX - drag.lastX;
                const dy = event.clientY - drag.lastY;

                const yawStep = dx * DRAG_SENSITIVITY;
                const pitchStep = dy * DRAG_SENSITIVITY * 0.75;

                view.yaw += yawStep;
                view.pitch = clamp(view.pitch + pitchStep, MIN_PITCH, MAX_PITCH);
                view.velocityYaw = yawStep;
                view.velocityPitch = pitchStep;

                drag.lastX = event.clientX;
                drag.lastY = event.clientY;
                drag.lastTime = performance.now();

                redrawIfIdle();
                return;
            }

            // subtle parallax while just hovering with a mouse
            if (event.pointerType !== "mouse" || reduceMotion) return;
            const rect = stage.getBoundingClientRect();
            const nx = (event.clientX - rect.left) / rect.width - 0.5;
            const ny = (event.clientY - rect.top) / rect.height - 0.5;
            parallax.targetYaw = nx * 0.3;
            parallax.targetPitch = ny * 0.18;
        };

        const endDrag = (event) => {
            if (!drag.active || event.pointerId !== drag.pointerId) return;

            drag.active = false;
            stage.classList.remove("is-dragging");
            if (stage.hasPointerCapture(event.pointerId)) {
                stage.releasePointerCapture(event.pointerId);
            }

            // holding still before letting go means no throw
            if (performance.now() - drag.lastTime > 90 || reduceMotion) {
                view.velocityYaw = 0;
                view.velocityPitch = 0;
            }
        };

        const handlePointerLeave = () => {
            parallax.targetYaw = 0;
            parallax.targetPitch = 0;
        };

        const handleDoubleClick = () => {
            view.velocityYaw = 0;
            view.velocityPitch = 0;

            if (running) {
                view.resetting = true;
            } else {
                view.yaw = 0;
                view.pitch = basePitch;
                redrawIfIdle();
            }
        };

        stage.addEventListener("pointerdown", handlePointerDown);
        stage.addEventListener("pointermove", handlePointerMove);
        stage.addEventListener("pointerup", endDrag);
        stage.addEventListener("pointercancel", endDrag);
        stage.addEventListener("pointerleave", handlePointerLeave);
        stage.addEventListener("dblclick", handleDoubleClick);

        return () => {
            stop();
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            stage.removeEventListener("pointerdown", handlePointerDown);
            stage.removeEventListener("pointermove", handlePointerMove);
            stage.removeEventListener("pointerup", endDrag);
            stage.removeEventListener("pointercancel", endDrag);
            stage.removeEventListener("pointerleave", handlePointerLeave);
            stage.removeEventListener("dblclick", handleDoubleClick);
        };
        // orbit layout only changes when the technology list changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technologies.join("|")]);

    return (
        <div
            ref={stageRef}
            className="skills-orbit"
            role="list"
            aria-label="Technologies I work with"
        >
            <svg className="skills-orbit-paths" aria-hidden="true">
                {orbits.map((orbit, index) => (
                    <g key={orbit.items.join("-")}>
                        <path
                            ref={(element) => {
                                backPathRefs.current[index] = element;
                            }}
                            className="skills-orbit-path-back"
                        />
                        <path
                            ref={(element) => {
                                frontPathRefs.current[index] = element;
                            }}
                            className="skills-orbit-path-front"
                        />
                    </g>
                ))}
            </svg>

            {nodes.map((node, index) => (
                <span
                    key={node.name}
                    ref={(element) => {
                        nodeRefs.current[index] = element;
                    }}
                    className="skills-orbit-node"
                    role="listitem"
                    onPointerEnter={() => {
                        hoveredRef.current = true;
                    }}
                    onPointerLeave={() => {
                        hoveredRef.current = false;
                    }}
                >
                    <span className="skills-orbit-node-fill" aria-hidden="true" />
                    <span className="skills-orbit-node-number">
                        {String(technologies.indexOf(node.name) + 1).padStart(2, "0")}
                    </span>
                    {node.name}
                </span>
            ))}

            <p ref={hintRef} className="skills-orbit-hint" aria-hidden="true">
                <span className="skills-orbit-hint-mouse">
                    Drag to spin · double-click to reset
                </span>
                <span className="skills-orbit-hint-touch">Swipe to spin</span>
            </p>
        </div>
    );
}
