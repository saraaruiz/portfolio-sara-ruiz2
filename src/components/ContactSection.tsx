export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] px-6 py-12 md:px-10 md:py-14">
          <img
            src="/Assets/Contactame/BackgroundContactame.svg"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_560px]">
            <div className="max-w-xl">
              <p className="eyebrow">CONTÁCTAME</p>
              <h2 className="mt-6 text-balance text-4xl font-medium leading-tight text-white md:text-5xl">
                Hablemos sobre tu próximo proyecto digital.
              </h2>
              <p className="mt-6 max-w-[44ch] text-sm leading-8 text-white/72">
                Si estás construyendo una experiencia digital que necesita estrategia, claridad y una ejecución visual
                cuidada, me encantará escucharla.
              </p>

              <a
                href="https://wa.me/573024157219"
                target="_blank"
                rel="noreferrer"
                className="btn-cta mt-8"
              >
                Iniciar conversación
              </a>
            </div>

            <div className="relative mx-auto h-[520px] w-full max-w-[520px]">
              <img
                src="/Assets/Contactame/BackgroundContactame.svg"
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
              />

              <img
                src="/Assets/Contactame/Avatarcontactame.svg"
                alt="Avatar Sara Ruiz"
                className="absolute bottom-0 left-1/2 z-10 w-[74%] -translate-x-[44%] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              />

              <img
                src="/Assets/Contactame/FrameIphone.svg"
                alt="Marco iPhone"
                className="absolute bottom-[12%] left-[6%] z-20 w-[36%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              />

              <div className="absolute bottom-[19%] left-[10.5%] z-30 w-[27%] rounded-[22px] border border-white/10 bg-black/85 p-3 text-[10px] leading-relaxed text-white/85 backdrop-blur-lg">
                <div className="rounded-[16px] bg-white/5 p-3">
                  <p className="font-medium text-white">¡Hola, soy Sara!</p>
                  <p className="mt-2 text-white/72">¿Hablamos sobre tu próximo proyecto?</p>
                </div>

                <a
                  href="https://wa.me/573024157219"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#d4ff59] px-3 py-2 text-[10px] font-medium text-black transition-colors hover:bg-white"
                >
                  Iniciar conversación
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}