import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Sobre mí", href: "#about" },
  { label: "Carrera", href: "#career" },
  { label: "Servicios", href: "#services" },
  { label: "Proyectos", href: "#projects" },
  { label: "Testimonios", href: "#testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [inCareer, setInCareer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      const career = document.getElementById("career");
      if (!career) return;

      const rect = career.getBoundingClientRect();
      const navHeight = 88;
      const active = rect.top <= navHeight && rect.bottom > navHeight;
      setInCareer(active);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shell = inCareer
    ? "bg-[rgba(249,246,229,0.9)] text-[#1A1A1A] backdrop-blur-xl"
    : scrolled
      ? "bg-black/45 text-white backdrop-blur-xl"
      : "bg-transparent text-white backdrop-blur-md";

  const linkColor = inCareer
    ? "text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
    : "text-white/75 hover:text-white";

  const actionText = inCareer ? "text-[#1A1A1A]/80 hover:text-[#1A1A1A]" : "text-white/75 hover:text-white";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${shell}`}>
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10 xl:px-16">
        <a href="#top" className="shrink-0">
          <img
            src="/Assets/Header/LogoSari.png"
            alt="Logo Sara Ruiz"
            className="h-8 w-auto md:h-9"
          />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link-tubelight text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${linkColor}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/Assets/Header/CVSaraRuiz.pdf"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${actionText}`}
          >
            CV <Download size={14} />
          </a>

          <a href="#contact" className="btn-cta">
            Hablemos
          </a>
        </div>

        <button
          className={`lg:hidden ${inCareer ? "text-[#1A1A1A]" : "text-white"}`}
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Abrir menú"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className={`border-t ${inCareer ? "border-black/10 bg-[rgba(249,246,229,0.98)]" : "border-white/10 bg-black/90"} lg:hidden`}>
          <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-6 md:px-10 xl:px-16">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium transition-colors duration-300 ${
                  inCareer ? "text-[#1A1A1A]/80 hover:text-[#1A1A1A]" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className={`mt-2 flex items-center gap-4 border-t pt-4 ${inCareer ? "border-black/10" : "border-white/10"}`}>
              <a
                href="/Assets/Header/CVSaraRuiz.pdf"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${actionText}`}
              >
                CV <Download size={14} />
              </a>

              <a href="#contact" onClick={() => setIsOpen(false)} className="btn-cta">
                Hablemos
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}