import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/*
 * Navigation that follows you down the page.
 *
 * At the top the regular links sit in the header. Once you scroll a little,
 * the links fly from the top-right over to the left edge one after another,
 * arrive showing their names, then fold into icons on a vertical rail.
 * Hovering an icon slides it out and reveals its name again. The rail also
 * marks the section currently on screen.
 */

// how far you scroll before the links move to the side
const SHOW_AFTER = 140;

function HomeIcon() {
    return (
        <>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </>
    );
}

function GearIcon() {
    return (
        <>
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </>
    );
}

function BicepsIcon() {
    return (
        <>
            <path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1" />
            <path d="M15 14a5 5 0 0 0-7.584 2" />
            <path d="M9.964 6.825C8.019 7.977 9.5 13 8 15" />
        </>
    );
}

function PhoneIcon() {
    return (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    );
}

const links = [
    { id: "home", name: "Home", Icon: HomeIcon },
    { id: "projects", name: "Projects", Icon: GearIcon },
    { id: "skills", name: "Skills", Icon: BicepsIcon },
    { id: "contact", name: "Contact", Icon: PhoneIcon },
];

export default function SideNav() {
    const [visible, setVisible] = useState(false);
    const [arriving, setArriving] = useState(false);
    const [active, setActive] = useState("home");

    // show the rail once the page has scrolled past the header links
    useEffect(() => {
        const update = () => setVisible(window.scrollY > SHOW_AFTER);
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    // while arriving, the links keep their names, then fold into icons
    useEffect(() => {
        if (!visible) {
            setArriving(false);
            return undefined;
        }

        setArriving(true);
        const timer = window.setTimeout(() => setArriving(false), 1300);
        return () => window.clearTimeout(timer);
    }, [visible]);

    // highlight the section in the middle of the screen
    useEffect(() => {
        const sections = links
            .map((link) => document.getElementById(link.id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -45% 0px" },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const className = [
        "side-nav",
        visible ? "is-visible" : "",
        arriving ? "is-arriving" : "",
    ]
        .filter(Boolean)
        .join(" ");

    // rendered on <body> so it stays fixed to the screen regardless of
    // any transforms or zoom applied to the page content
    return createPortal(
        <nav className={className} aria-label="Section navigation" aria-hidden={!visible}>
            <span className="side-nav-line" aria-hidden="true" />

            {links.map(({ id, name, Icon }, index) => (
                <a
                    key={id}
                    href={`#${id}`}
                    className={`side-nav-item ${active === id ? "is-active" : ""}`}
                    style={{ "--i": index }}
                    tabIndex={visible ? 0 : -1}
                    aria-current={active === id ? "true" : undefined}
                >
                    <span className="side-nav-icon">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <Icon />
                        </svg>
                    </span>
                    <span className="side-nav-label">{name}</span>
                </a>
            ))}
        </nav>,
        document.body,
    );
}
