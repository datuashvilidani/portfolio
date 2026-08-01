import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";


const CONTACT_EMAIL = "danieldatuashvili@gmail.com";

const contactDetails = [
    {
        label: "Email",
        value: CONTACT_EMAIL,
    },
    {
        label: "Availability",
        value: "Open for selected projects",
    },
    {
        label: "Response time",
        value: "within 24 hours",
    },
];

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/datuashvilidani",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/daniell-datuashvili",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/datuashvilli_/",
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

export default function Contact() {
    const sectionRef = useRef(null);
    const [formState, submitToFormspree] = useForm("mrenvdde");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        project: "",
        message: "",
    });

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("contact-visible");
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

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }



    return (
        <section
            ref={sectionRef}
            id="contact"
            className="contact-section relative overflow-hidden bg-black text-white"
        >
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="contact-red-glow contact-red-glow-one" />
                <div className="contact-red-glow contact-red-glow-two" />

                <div className="contact-orbit contact-orbit-one" />
                <div className="contact-orbit contact-orbit-two" />

                <span className="contact-background-word">CONTACT</span>

                <div className="contact-floating-symbol contact-symbol-one">
                    {"</>"}
                </div>

                <div className="contact-floating-symbol contact-symbol-two">
                    {"{ }"}
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
                {/* Heading */}
                <div className="grid gap-12 lg:grid-cols-[1fr_0.42fr] lg:items-end">
                    <div>
                        <div
                            className="contact-reveal flex items-center gap-4"
                            style={{ "--contact-delay": "0ms" }}
                        >
                            <span className="contact-heading-line" />

                            <p className="text-xs uppercase tracking-[0.4em] text-white/55">
                                Start a conversation
                            </p>
                        </div>

                        <h2 className="contact-heading mt-10 font-serif text-5xl leading-[0.94] sm:text-7xl lg:text-8xl">
                            <span
                                className="contact-reveal block"
                                style={{ "--contact-delay": "100ms" }}
                            >
                                Have an idea?
                            </span>

                            <span
                                className="contact-reveal block italic text-[#861d28]"
                                style={{ "--contact-delay": "220ms" }}
                            >
                                Let&apos;s build it.
                            </span>
                        </h2>
                    </div>

                    <p
                        className="contact-reveal max-w-md border-l border-white/20 pl-6 text-sm leading-7 text-white/55 sm:text-base"
                        style={{ "--contact-delay": "360ms" }}
                    >
                        Tell me about your project, idea or challenge. I am available for
                        frontend, backend and complete full-stack development.
                    </p>
                </div>

                <div className="mt-14 h-px overflow-hidden bg-white/10">
                    <div className="contact-main-line h-full bg-white" />
                </div>

                {/* Main content */}
                <div className="mt-16 grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
                    {/* Contact information */}
                    <aside>
                        <div
                            className="contact-reveal"
                            style={{ "--contact-delay": "450ms" }}
                        >
                            <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                                Contact information
                            </p>

                            <p className="contact-email mt-6 font-serif text-3xl sm:text-2xl">
                                {CONTACT_EMAIL}
                            </p>
                        </div>

                        <div className="mt-14 border-t border-white/15">
                            {contactDetails.map((detail, index) => {
                                const content = (
                                    <>
                                        <span className="text-xs uppercase tracking-[0.22em] text-white/35">
                                            {detail.label}
                                        </span>

                                        <span className="text-sm text-white/75">
                                            {detail.value}
                                        </span>
                                    </>
                                );

                                return detail.href ? (
                                    <a
                                        key={detail.label}
                                        href={detail.href}
                                        className="contact-detail-row contact-reveal"
                                        style={{
                                            "--contact-delay": `${index * 100 + 520}ms`,
                                        }}
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div
                                        key={detail.label}
                                        className="contact-detail-row contact-reveal"
                                        style={{
                                            "--contact-delay": `${index * 100 + 520}ms`,
                                        }}
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>

                        <div
                            className="contact-reveal mt-14"
                            style={{ "--contact-delay": "800ms" }}
                        >
                            <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                                Find me online
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="contact-social-link"
                                    >
                                        {social.name}
                                        <span>↗</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Contact form */}
                    <form
                        onSubmit={submitToFormspree}
                        className="contact-form contact-reveal"
                        style={{ "--contact-delay": "500ms" }}
                    >
                        <div className="contact-form-header">
                            <span className="font-serif text-2xl italic text-white/40">
                                01
                            </span>

                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                Project inquiry
                            </p>
                        </div>

                        <div className="mt-10 grid gap-8 sm:grid-cols-2">
                            <label className="contact-field">
                                <span>Your name</span>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Smith"
                                    required
                                />
                            </label>

                            <label className="contact-field">
                                <span>Email address</span>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                />

                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={formState.errors}
                                    className="mt-2 block text-xs text-[#b93242]"
                                />
                            </label>
                        </div>

                        <label className="contact-field mt-8 block">
                            <span>Project type</span>

                            <select
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a project type</option>
                                <option value="Full website development">
                                    Full website development
                                </option>
                                <option value="Frontend development">
                                    Frontend development
                                </option>
                                <option value="Backend development">
                                    Backend development
                                </option>
                                <option value="Website redesign">Website redesign</option>
                                <option value="Other project">Other project</option>
                            </select>
                        </label>

                        <label className="contact-field mt-8 block">
                            <span>Tell me about your idea</span>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Project goals, required features, expected timeline..."
                                rows="6"
                                required
                            />

                            <ValidationError
                                prefix="Message"
                                field="message"
                                errors={formState.errors}
                                className="mt-2 block text-xs text-[#b93242]"
                            />
                        </label>

                        <ValidationError
                            errors={formState.errors}
                            className="mt-8 block border border-[#861d28]/40 bg-[#861d28]/10 px-5 py-4 text-sm text-[#d65a68]"
                        />

                        {formState.succeeded && (
                            <div
                                className="mt-8 border border-white/15 bg-white/[0.04] px-5 py-4"
                                role="status"
                            >
                                <p className="text-sm text-white">
                                    Your message has been sent successfully.
                                </p>

                                <p className="mt-1 text-xs text-white/45">
                                    I will respond using the email address you provided.
                                </p>
                            </div>
                        )}

                        <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
                            <p className="max-w-xs text-xs leading-6 text-white/35">
                                Your information will be submitted securely and delivered
                                directly to my email inbox.
                            </p>

                            <button
                                type="submit"
                                disabled={formState.submitting || formState.succeeded}
                                className="contact-submit-button group disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {formState.submitting
                                        ? "Sending..."
                                        : formState.succeeded
                                            ? "Message sent"
                                            : "Send inquiry"}
                                </span>

                                <span className="contact-submit-arrow">
                                    <ArrowIcon />
                                </span>
                            </button>
                        </div>

                        <span className="contact-form-corner contact-form-corner-top" />
                        <span className="contact-form-corner contact-form-corner-bottom" />
                    </form>
                </div>

                {/* Footer */}
                <footer className="contact-footer contact-reveal">
                    <p>© {new Date().getFullYear()} Portfolio</p>

                    <a href="#home">
                        Back to top
                        <span>↑</span>
                    </a>
                </footer>
            </div>

            {/* Marquee */}
            <div className="contact-marquee border-y border-white/10">
                <div className="contact-marquee-track">
                    {[...Array(6)].map((_, index) => (
                        <span key={index}>
                            AVAILABLE FOR CREATIVE PROJECTS
                            <span className="mx-10 text-[#861d28]">◆</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}