import { useEffect, useRef } from "react";
import pantherImage from "../assets/panther.jpg";
import woodImage from "../assets/wood.jpg";
import SkillsOrbit from "./SkillsOrbit";

const skillGroups = [
    {
        number: "01",
        title: "Frontend",
        description: "Responsive interfaces with clean structure and smooth motion.",
        skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    },
    {
        number: "02",
        title: "Backend",
        description: "Secure backend systems, authentication and application logic.",
        skills: ["Django", "Python", "Node.js", "SQL"],
    },
    {
        number: "03",
        title: "Development",
        description: "Complete websites built from interface design to deployment.",
        skills: ["API Logic", "Authentication", "Responsive Design", "Deployment"],
    },
];

const technologies = [
    "React",
    "JavaScript",
    "Python",
    "Django",
    "Node.js",
    "SQL",
    "Tailwind CSS",
    "HTML",
    "CSS",
];

function ImagePlaceholder({ number, title, dark = false }) {
    return (
        <div
            className={`skills-image-placeholder ${dark ? "skills-image-placeholder-dark" : ""
                }`}
        >
            <div className="skills-image-corner skills-image-corner-top" />
            <div className="skills-image-corner skills-image-corner-bottom" />

            <span className="skills-image-number">{number}</span>

            <div className="relative z-10 text-center">
                <p className="text-xs uppercase tracking-[0.3em] opacity-50">
                    Image showcase
                </p>

                <h3 className="mt-4 font-serif text-3xl sm:text-4xl">{title}</h3>

                <p className="mt-3 text-sm opacity-45">
                    Your project image will be placed here.
                </p>
            </div>
        </div>
    );
}

function SkillImage({ src, alt, number, className = "" }) {
    return (
        <div className={`skills-showcase-image ${className}`}>
            <img src={src} alt={alt} />

            {number && (
                <span className="skills-showcase-image-number">{number}</span>
            )}

            <div className="skills-image-corner skills-image-corner-top" />
            <div className="skills-image-corner skills-image-corner-bottom" />
        </div>
    );
}

export default function Skills() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("skills-visible");
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12,
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="skills-section relative overflow-hidden bg-white text-black"
        >
            {/* Minimal background lines */}
            <div className="pointer-events-none absolute inset-0">
                <div className="skills-background-line skills-background-line-one" />
                <div className="skills-background-line skills-background-line-two" />
                <div className="skills-background-circle" />

                <span className="skills-background-text">SKILLS</span>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
                {/* Heading */}
                <div className="grid gap-12 lg:grid-cols-[1fr_0.42fr] lg:items-end">
                    <div>
                        <div
                            className="skills-drop flex items-center gap-4"
                            style={{ "--delay": "0ms" }}
                        >
                            <span className="skills-small-line" />

                            <p className="text-xs font-medium uppercase tracking-[0.4em]">
                                Skills and capabilities
                            </p>
                        </div>

                        <h2 className="mt-10 font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
                            <span
                                className="skills-drop block"
                                style={{ "--delay": "100ms" }}
                            >
                                Design.
                            </span>

                            <span
                                className="skills-drop block text-black/35"
                                style={{ "--delay": "220ms" }}
                            >
                                Develop.
                            </span>

                            <span
                                className="skills-drop block italic"
                                style={{ "--delay": "340ms" }}
                            >
                                Deliver.
                            </span>
                        </h2>
                    </div>

                    <p
                        className="skills-drop max-w-md border-l border-black/20 pl-6 text-sm leading-7 text-black/55 sm:text-base"
                        style={{ "--delay": "460ms" }}
                    >
                        I combine interface design, frontend development and backend logic
                        to build complete digital experiences.
                    </p>
                </div>

                <div className="mt-14 h-px overflow-hidden bg-black/10">
                    <div className="skills-heading-line h-full bg-black" />
                </div>

                {/* Skills */}
                <div className="mt-16 grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
                    <div className="skills-groups-column">
                        {skillGroups.map((group, index) => (
                            <article
                                key={group.title}
                                className="skills-group skills-drop"
                                style={{
                                    "--delay": `${index * 150 + 500}ms`,
                                }}
                            >
                                <div className="skills-group-header">
                                    <span className="font-serif text-xl italic text-black/35">
                                        {group.number}
                                    </span>

                                    <h3 className="font-serif text-3xl sm:text-4xl">
                                        {group.title}
                                    </h3>

                                    <span className="skills-group-plus"></span>
                                </div>

                                <p className="mt-5 max-w-lg text-sm leading-7 text-black/55">
                                    {group.description}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {group.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skill}
                                            className="skills-pill"
                                            style={{
                                                "--skill-delay": `${index * 120 + skillIndex * 70 + 650
                                                    }ms`,
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="skills-showcase-grid">
                        <div
                            className="skills-picture-drop skills-picture-large"
                            style={{ "--delay": "650ms" }}
                        >
                            <SkillImage
                                src={pantherImage}
                                alt="Black panther"

                                className="skills-showcase-image-large"
                            />
                        </div>

                        <div
                            className="skills-picture-drop"
                            style={{ "--delay": "800ms" }}
                        >
                            <SkillImage
                                src={woodImage}
                                alt="Wood texture"

                            />
                        </div>

                        <div
                            className="skills-picture-drop"
                            style={{ "--delay": "950ms" }}
                        >
                            <div className="skills-quote-card">
                                <span className="font-serif text-5xl">“</span>

                                <p className="mt-5 font-serif text-2xl leading-relaxed sm:text-3xl">
                                    Simplicity is not the absence of detail. It is the control of
                                    detail.
                                </p>

                                <span className="mt-8 block h-px w-16 bg-white/40" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technology list */}
                <div className="skills-technology-section mt-24">
                    <div
                        className="skills-drop flex items-end justify-between gap-8"
                        style={{ "--delay": "850ms" }}
                    >
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-black/45">
                                Technology stack
                            </p>

                            <h3 className="mt-4 font-serif text-3xl sm:text-4xl">
                                Tools I work with
                            </h3>
                        </div>

                        <span className="hidden font-serif text-5xl italic text-black/15 sm:block">
                            {String(technologies.length).padStart(2, "0")}
                        </span>
                    </div>

                    <div
                        className="skills-drop mt-10 border-t border-black"
                        style={{ "--delay": "950ms" }}
                    >
                        <SkillsOrbit technologies={technologies} />
                    </div>
                </div>
            </div>

            {/* Moving footer text */}
            <div className="skills-marquee border-y border-black/15 py-5">
                <div className="skills-marquee-track">
                    {[...technologies, ...technologies].map((technology, index) => (
                        <span key={`${technology}-${index}`}>
                            {technology}
                            <span className="mx-8 text-black/25">◆</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}