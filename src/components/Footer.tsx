const quickLinks = [
  { label: "Sobre mí", href: "#about" },
  { label: "Carrera", href: "#career" },
  { label: "Servicios", href: "#services" },
  { label: "Mis proyectos", href: "#projects" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Hablemos", href: "#contact" },
];

const socialIcons = [
  { label: "WhatsApp", href: "https://wa.me/573024157219", icon: "/Assets/Body/whatsapp.svg" },
  { label: "Email", href: "mailto:saruizdi@gmail.com", icon: "/Assets/Body/email.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sararuiz-ux-ui/", icon: "/Assets/Body/linkedin.svg" },
  { label: "Instagram", href: "https://instagram.com/saridesign__", icon: "/Assets/Body/instagram.svg" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060606] py-16">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-6 md:px-10 xl:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <img
              src="/Assets/Header/LogoSari.png"
              alt="Logo Sara Ruiz"
              className="h-10 w-auto"
            />
            <p className="mt-5 text-sm leading-7 text-white/62">
              Portfolio UX/UI orientado a estrategia, diseño y experiencias digitales con criterio de producto.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">Navegación</p>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-white/72 transition-colors hover:text-[#d4ff59]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Redes</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors hover:border-[#d4ff59]/30 hover:bg-white/[0.06]"
                    aria-label={social.label}
                  >
                    <img src={social.icon} alt={social.label} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-white/35 md:flex-row md:items-center md:justify-between">
          <span>Sara Ruiz — Portfolio UX/UI</span>
          <span>ESP | ENG</span>
        </div>
      </div>
    </footer>
  );
}