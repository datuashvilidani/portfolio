import { useEffect, useRef } from "react";
import weddingPreview from "../assets/wedding.png";
import sadaPreview from "../assets/sada.png";

const projects = [
    {
        number: "01",
        name: "Sofia & Leon",
        type: "Digital Wedding Invitation",
        description:
            "An interactive digital wedding invitation with a starry-night theme, a wax-seal opening animation and elegant typography that sets the tone for the celebration.",
        url: "https://sofialeonwedding.vercel.app/",
        features: ["Interactive Invitation", "Animations", "Elegant Typography"],
        preview: "wedding",
        theme: "navy",
    },
    {
        number: "02",
        name: "Sada AI",
        type: "Full-Stack Platform",
        description:
            "A complete website running on its own domain with full backend logic, secure email verification, login and user registration.",
        url: "https://sadaeu.com/",
        features: ["Backend Logic", "Email Verification", "Authentication"],
        preview: "sada",
        theme: "black",
    },
];
function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M5 19 19 5" />
            <path d="M8 5h11v11" />
        </svg>
    );
}

function WeddingPreview() {
    return (
        <div className="old-money-preview">
            <div className="preview-browser-header">
                <div className="flex gap-1.5">
                    <span />
                    <span />
                    <span />
                </div>

                <p>sofialeonwedding.vercel.app</p>
            </div>

            <a
                href="https://sofialeonwedding.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden"
            >
                <img
                    src={weddingPreview}
                    alt="Sofia & Leon digital wedding invitation preview"
                    className="block h-auto w-full"
                />
            </a>

            <span className="preview-corner preview-corner-top" />
            <span className="preview-corner preview-corner-bottom" />
        </div>
    );
}

function SadaPreview() {
  return (
    <div className="old-money-preview old-money-preview-sada">
      <div className="preview-browser-header">
        <div className="flex gap-1.5">
          <span />
          <span />
          <span />
        </div>

        <p>sadaeu.com</p>
      </div>

      <a
        href="https://sadaeu.com/"
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden bg-black"
      >
        <img
          src={sadaPreview}
          alt="Sada AI website preview"
          className="block h-auto w-full"
        />
      </a>
    </div>
  );
}

export default function Projects() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("projects-visible");
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="projects-old-money relative overflow-hidden"
        >
            {/* Decorative background animations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="old-money-orbit old-money-orbit-one" />
                <div className="old-money-orbit old-money-orbit-two" />

                <div className="old-money-floating-mark old-money-mark-one">
                    01
                </div>

                <div className="old-money-floating-mark old-money-mark-two">
                    II
                </div>

                <div className="old-money-background-line old-money-line-one" />
                <div className="old-money-background-line old-money-line-two" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
                {/* Section heading */}
                <div className="projects-heading project-reveal">
                    <div className="mb-7 flex items-center gap-4">
                        <span className="h-px w-12 bg-white/45" />

                        <p className="text-xs font-medium uppercase tracking-[0.38em] text-white/60">
                            Selected portfolio
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
                        <h2 className="old-money-title text-5xl text-white sm:text-6xl lg:text-7xl">
                            Selected
                            <span className="block italic text-white/55">Works.</span>
                        </h2>

                        <p className="max-w-md border-l border-white/20 pl-6 text-sm leading-7 text-white/55 sm:text-base">
                            A curated collection of design-driven and full-stack digital
                            experiences.
                        </p>
                    </div>

                    <div className="mt-12 h-px w-full bg-white/15">
                        <div className="old-money-heading-line h-full w-0 bg-white" />
                    </div>
                </div>

                {/* Projects */}
                <div className="mt-16 space-y-12 lg:mt-24 lg:space-y-20">
                    {projects.map((project, index) => (
                        <article
                            key={project.name}
                            className={`old-money-project-card project-reveal ${index % 2 !== 0 ? "old-money-project-reverse" : ""
                                } ${project.theme === "black" ? "old-money-project-card-black" : ""}`}
                            style={{
                                "--project-delay": `${index * 180 + 150}ms`,
                            }}
                        >
                            <div className="old-money-card-shine" />

                            <div className="relative z-10 grid gap-10 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
                                {/* Website preview */}
                                <div
                                    className={
                                        index % 2 !== 0
                                            ? "lg:order-2"
                                            : "lg:order-1"
                                    }
                                >
                                    {project.preview === "wedding" ? (
                                        <WeddingPreview />
                                    ) : (
                                        <SadaPreview />
                                    )}
                                </div>

                                {/* Information */}
                                <div
                                    className={`py-2 ${index % 2 !== 0
                                        ? "lg:order-1 lg:pr-8"
                                        : "lg:order-2 lg:pl-8"
                                        }`}
                                >
                                    <div className="flex items-center justify-between border-b border-white/15 pb-5">
                                        <p className="old-money-project-number">
                                            {project.number}
                                        </p>

                                        <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                                            {project.type}
                                        </p>
                                    </div>

                                    <h3 className="old-money-project-name mt-8 text-4xl text-white sm:text-5xl">
                                        {project.name}
                                    </h3>

                                    <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                                        {project.description}
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-2">
                                        {project.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/65"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="old-money-project-link group mt-10 inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-white"
                                    >
                                        <span>Visit live project</span>

                                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition duration-500 group-hover:bg-white group-hover:text-[#06182b]">
                                            <ArrowIcon />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="project-reveal mt-20 flex items-center justify-center gap-5">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="old-money-footer-symbol">◆</span>
                    <span className="h-px flex-1 bg-white/10" />
                </div>
            </div>
        </section>
    );
}