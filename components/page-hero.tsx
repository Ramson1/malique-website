import Link from "next/link";

type PageHeroProps = {
  title: string;
  section: string;
  description?: string;
};

export function PageHero({ title, section, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden gradient-navy pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Breadcrumb */}
        <nav data-reveal className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <Link href="/" className="hover:text-amber-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-500">{section}</span>
        </nav>

        <h1
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          {title}
        </h1>
        {description && (
          <p
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="text-lg text-slate-300 leading-relaxed max-w-2xl"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
