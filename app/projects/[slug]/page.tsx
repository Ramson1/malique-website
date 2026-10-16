import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  BadgeCheck,
  Building2,
  Users,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { projects, getProject } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project Not Found — Malique Oil and Gas Ltd" };
  }
  return {
    title: `${project.title} — Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const Icon = project.icon;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden gradient-navy pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
              <Link href="/" className="hover:text-amber-500 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/projects"
                className="hover:text-amber-500 transition-colors"
              >
                Projects
              </Link>
              <span>/</span>
              <span className="text-amber-500">{project.category}</span>
            </nav>

            <div data-reveal className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <Icon className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
                  {project.category}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Meta chips */}
            <div
              data-reveal
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white">
                <BadgeCheck className="w-3.5 h-3.5 text-amber-500" />
                {project.status}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white">
                <Building2 className="w-3.5 h-3.5 text-amber-500" />
                {project.sector}
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-5">
                    Project Overview
                  </h2>
                  <div className="space-y-4">
                    {project.overview.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-slate-600 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Scope */}
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-5">
                    Scope of Work
                  </h2>
                  <ul data-reveal-group className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                    {project.scope.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="w-[18px] h-[18px] shrink-0 text-amber-600 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Capabilities */}
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-5">
                    Capability Highlights
                  </h2>
                  <div data-reveal-group className="grid sm:grid-cols-2 gap-4">
                    {project.capabilities.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3"
                      >
                        <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                        <span className="text-sm text-slate-700 font-medium leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside data-reveal-group className="space-y-6">
                <div className="rounded-2xl gradient-navy p-6 text-white">
                  <h3 className="font-bold text-lg mb-4">Engagement Details</h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-slate-400 mb-1">Status</dt>
                      <dd className="font-semibold flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-amber-500" />
                        {project.status}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 mb-1">Location</dt>
                      <dd className="font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        {project.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 mb-1">Sector</dt>
                      <dd className="font-semibold">{project.sector}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 mb-1.5">Who we serve</dt>
                      <dd>
                        <ul className="space-y-1.5">
                          {project.clientTypes.map((clientType) => (
                            <li
                              key={clientType}
                              className="flex items-center gap-2 text-slate-200"
                            >
                              <Users className="w-3.5 h-3.5 text-amber-500" />
                              {clientType}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="font-bold text-navy-900 mb-2">
                    Want a result like this?
                  </h3>
                  <p className="text-sm text-slate-600 mb-5">
                    Tell us what you need — our team will prepare a tailored
                    proposal and quotation.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/quote"
                      className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors w-full"
                    >
                      Request a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center h-11 px-6 rounded-xl border border-slate-300 bg-white text-navy-900 font-medium hover:bg-slate-100 transition-colors w-full"
                    >
                      Talk to Our Team
                    </Link>
                  </div>
                </div>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-amber-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all projects
                </Link>
              </aside>
            </div>
          </div>
        </section>

        {/* Other projects */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="container-custom">
            <h2 data-reveal className="text-2xl font-bold text-navy-900 mb-8">
              More From Our Portfolio
            </h2>
            <div data-reveal-group className="grid md:grid-cols-3 gap-6">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl gradient-navy flex items-center justify-center mb-4">
                    <other.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-1">
                    {other.category}
                  </div>
                  <h3 className="font-bold text-navy-900 group-hover:text-amber-600 transition-colors">
                    {other.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
