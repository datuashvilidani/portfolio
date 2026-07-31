import { useEffect, useState } from "react";
import profileImage from "../assets/pfp.jpg";

const navigation = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
];

function MenuIcon({ open }) {
    return (
        <div className="relative h-6 w-6">
            <span
                className={`absolute left-0 top-1 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""
                    }`}
            />

            <span
                className={`absolute left-0 top-3 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${open ? "opacity-0" : ""
                    }`}
            />

            <span
                className={`absolute left-0 top-5 h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""
                    }`}
            />
        </div>
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
        <header
            id="home"
            className="relative min-h-screen overflow-hidden bg-black text-white"
        >
            {/* Floating background animations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="background-orb background-orb-one" />
                <div className="background-orb background-orb-two" />
                <div className="background-orb background-orb-three" />

                <div className="floating-symbol floating-symbol-one">
                    {"</>"}
                </div>

                <div className="floating-symbol floating-symbol-two">
                    {"{ }"}
                </div>

                <div className="floating-symbol floating-symbol-three">
                    01
                </div>
            </div>

            {/* Navigation */}
            <nav className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

                <div className="hidden items-center gap-8 md:flex">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-white/65 transition duration-300 hover:text-white"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <a
                    href="#contact"
                    className="hidden rounded-full border border-[#65131c] bg-[#65131c] px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#831b27] md:inline-flex"
                >
                    Contact
                </a>

                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 md:hidden"
                    aria-label="Open navigation menu"
                    aria-expanded={menuOpen}
                >
                    <div className="flex w-5 flex-col gap-1.5">
                        <span className="h-0.5 w-full bg-white" />
                        <span className="h-0.5 w-full bg-white" />
                        <span className="h-0.5 w-full bg-white" />
                    </div>
                </button>
            </nav>

            {/* Mobile navigation */}
            <div
                className={`fixed inset-0 z-[100] flex flex-col bg-black transition-all duration-500 md:hidden ${menuOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-full opacity-0"
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-6">

                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="relative flex h-11 w-11 items-center justify-center"
                        aria-label="Close navigation menu"
                    >
                        <span className="absolute h-0.5 w-7 rotate-45 bg-white" />
                        <span className="absolute h-0.5 w-7 -rotate-45 bg-white" />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col items-center justify-center gap-8 pb-10">
                    {navigation.map((item, index) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`text-xl uppercase tracking-[0.2em] transition duration-300 hover:text-[#a92635] ${index === 0
                                ? "font-bold text-white"
                                : "font-medium text-white/65"
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                <div className="space-y-3 px-8 pb-10">
                    <a
                        href="#projects"
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center justify-center rounded-md border border-white/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#7f1822] hover:bg-[#7f1822]"
                    >
                        View Projects
                    </a>

                    <a
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center justify-center rounded-md bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-[#7f1822] hover:text-white"
                    >
                        Contact Me
                    </a>
                </div>

                <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7f1822]/15 blur-[100px]" />
            </div>

            {/* Hero */}
            <section className="relative z-10 mx-auto grid min-h-[calc(100vh-94px)] max-w-7xl items-center gap-16 px-6 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
                {/* Profile image and floating code */}
                <div className="relative mx-auto flex w-full max-w-lg justify-center lg:justify-start">
                    <div className="profile-container relative">
                        <div className="absolute -inset-8 rounded-full bg-[#65131c]/20 blur-3xl" />

                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] p-2">
                            <img
                                src={profileImage}
                                alt="Developer profile"
                                className="h-[370px] w-[300px] rounded-[1.6rem] object-cover sm:h-[460px] sm:w-[370px]"
                            />
                        </div>

                        {/* Floating code card */}
                        <div className="code-card-float absolute -top-20 -right-5 w-[230px] overflow-hidden rounded-2xl border border-white/10 bg-[#090909]/95 shadow-2xl backdrop-blur-xl sm:-top-8 sm:left-60 sm:w-[320px]">
                            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                <div className="flex gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#65131c]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                </div>

                                <span className="text-xs text-white/35">developer.js</span>
                            </div>

                            <div className="p-5 font-mono text-xs leading-6 sm:text-sm">
                                <p>
                                    <span className="text-[#9e2935]">const</span>{" "}
                                    <span className="text-white">developer</span>{" "}
                                    <span className="text-white/40">=</span>{" "}
                                    <span className="text-white">{"{"}</span>
                                </p>

                                <p className="pl-4">
                                    <span className="text-white/50">focus:</span>{" "}
                                    <span className="text-white">&quot;Web Development&quot;</span>,
                                </p>

                                <p className="pl-4">
                                    <span className="text-white/50">frontend:</span>{" "}
                                    <span className="text-white">&quot;React&quot;</span>,
                                </p>

                                <p className="pl-4">
                                    <span className="text-white/50">backend:</span>{" "}
                                    <span className="text-white">&quot;Node.js&quot;</span>,
                                </p>

                                <p className="pl-4">
                                    <span className="text-white/50">status:</span>{" "}
                                    <span className="text-[#a8333e]">&quot;Building&quot;</span>
                                </p>

                                <p className="text-white">{"}"};</p>

                                <p className="mt-3">
                                    <span className="text-white">developer</span>
                                    <span className="text-white/40">.</span>
                                    <span className="text-[#9e2935]">create</span>
                                    <span className="text-white">()</span>
                                    <span className="typing-cursor ml-1 inline-block h-4 w-1.5 bg-[#8a1c27] align-middle" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimal text section */}
                <div className="max-w-xl pt-16 lg:pt-0">
                    <p className="animate-fade-up text-sm uppercase tracking-[0.35em] text-[#971f2b]">
                        Full-Stack Developer
                    </p>

                    <h1 className="animate-fade-up-delay mt-5 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                        Building clean
                        <span className="block text-[#7f1822]">digital experiences.</span>
                    </h1>

                    <p className="animate-fade-up-delay-2 mt-6 max-w-md text-base leading-7 text-white/55 sm:text-lg">
                        Modern websites with functional code, responsive design and smooth
                        interactions.
                    </p>

                    <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-2.5">
                        {[
                            "React",
                            "JavaScript",
                            "Python",
                            "Django",
                            "Node.js",
                            "Tailwind",
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition duration-300 hover:border-[#65131c] hover:text-white"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="animate-fade-up-delay-4 mt-9 flex flex-col gap-4 sm:flex-row">
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center rounded-full bg-[#65131c] px-7 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#831b27]"
                        >
                            View Projects
                        </a>

                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-[#65131c]"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </section>
        </header>
    );
}