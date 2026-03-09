const tools = [
  "Figma",
  "FigJam",
  "Notion",
  "Miro",
  "Canva",
  "Illustrator",
  "Photoshop",
  "ChatGPT",
  "HTML",
  "CSS",
  "Tailwind",
  "JavaScript",
];

export default function StackSection() {
  const track = [...tools, ...tools];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#32111f_0%,#7a2051_45%,#CD3075_100%)] py-5 md:py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

      <div className="stack-marquee">
        <div className="stack-track">
          {track.map((tool, index) => (
            <div
              key={`${tool}-${index}`}
              className="group inline-flex min-w-max items-center gap-3 rounded-full border border-white/10 bg-black/35 px-5 py-3 backdrop-blur-md"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white/80 transition-colors duration-300 group-hover:bg-[#d4ff59]" />
              <span className="text-sm font-medium text-white/85 transition-colors duration-300 group-hover:text-white">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}