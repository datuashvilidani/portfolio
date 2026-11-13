import { useEffect, useState } from "react";
import portraitImage from "../assets/me-cutout.png";

const navigation = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
];

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M5 19 19 5" />
            <path d="M8 5h11v11" />
        </svg>
    );
}

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <header id="home" className="hero-section relative overflow-hidden bg-white text-black">
            {/* Minimal background lines */}
            <div className="pointer-events-none absolute inset-0">
                <div className="skills-background-line skills-background-line-one" />
                <div className="hero-background-circle" />
            </div>

            {/* Navigation */}
            <nav className="hero-drop relative z-30 mx-auto flex max-w-7xl items-center justify-between px-8 py-9 lg:px-12">
                <a href="#home" className="font-serif text-2xl italic">
                    Daniel&apos;s Workspace<span className="text-black/30">.</span>
                </a>

                <div className="hidden items-center gap-10 md:flex">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="hero-nav-link">
                            {item.name}
                        </a>
                    ))}

                    <a href="#contact" className="hero-nav-link hero-nav-contact">
                        Contact
                    </a>
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    className="flex h-11 w-11 items-center justify-center md:hidden"
                    aria-label="Open navigation menu"
                    aria-expanded={menuOpen}
                >
                    <div className="flex w-6 flex-col gap-1.5">
                        <span className="h-px w-full bg-black" />
                        <span className="h-px w-2/3 self-end bg-black" />
                    </div>
                </button>
            </nav>

            {/* Mobile navigation */}
            <div
                className={`fixed inset-0 z-[100] flex flex-col bg-white text-black transition-all duration-500 md:hidden ${menuOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-full opacity-0"
                    }`}
            >
                <div className="flex items-center justify-between px-8 py-9">
                    <span className="font-serif text-2xl italic">
                        Daniel&apos;s Workspace<span className="text-black/30">.</span>
                    </span>

                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="relative flex h-11 w-11 items-center justify-center"
                        aria-label="Close navigation menu"
                    >
                        <span className="absolute h-px w-7 rotate-45 bg-black" />
                        <span className="absolute h-px w-7 -rotate-45 bg-black" />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col justify-center gap-2 border-t border-black/10 px-8">
                    {[...navigation, { name: "Contact", href: "#contact" }].map(
                        (item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-baseline gap-5 border-b border-black/10 py-5"
                            >
                                <span className="text-xs text-black/35">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="font-serif text-4xl">{item.name}</span>
                            </a>
                        ),
                    )}
                </nav>
            </div>

            {/* Hero */}
            <div className="hero-content relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
                <div className="max-w-2xl lg:max-w-[58%]">
                    <div
                        className="hero-drop flex items-center gap-4"
                        style={{ "--delay": "100ms" }}
                    >
                        <span className="hero-small-line" />

                        <p className="text-xs font-medium uppercase tracking-[0.4em]">
                            Full-stack developer
                        </p>
                    </div>

                    <h1 className="mt-10 font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
                        <span className="hero-drop block" style={{ "--delay": "200ms" }}>
                            Building
                        </span>

                        <span
                            className="hero-drop block text-black/35"
                            style={{ "--delay": "320ms" }}
                        >
                            clean digital
                        </span>

                        <span
                            className="hero-drop block italic"
                            style={{ "--delay": "440ms" }}
                        >
                            experiences.
                        </span>
                    </h1>

                    <p
                        className="hero-drop mt-10 max-w-md border-l border-black/20 pl-6 text-sm leading-7 text-black/55 sm:text-base"
                        style={{ "--delay": "560ms" }}
                    >
                        Modern websites with functional code, responsive design and smooth
                        interactions — from interface to deployment.
                    </p>

                    <div
                        className="hero-drop mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
                        style={{ "--delay": "680ms" }}
                    >
                        <a href="#projects" className="hero-cta group">
                            <span>View projects</span>
                            <span className="hero-cta-icon">
                                <ArrowIcon />
                            </span>
                        </a>

                        <a href="#contact" className="hero-text-link">
                            Get in touch
                        </a>
                    </div>
                </div>
            </div>

            {/* Portrait leaning on the frame */}
            <img
                src={portraitImage}
                alt="Portrait of the developer"
                className="hero-portrait"
            />

            {/* Bottom details */}
            <div
                className="hero-drop hero-scroll absolute bottom-10 left-8 z-10 hidden items-center gap-4 sm:flex lg:left-12"
                style={{ "--delay": "900ms" }}
            >
                <span className="hero-scroll-line" />
                <span className="text-xs uppercase tracking-[0.35em] text-black/45">
                    Scroll
                </span>
            </div>
        </header>
    );
}
