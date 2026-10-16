"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  Flame,
  Tag,
  TrendingDown,
  Newspaper,
  Info,
  Pin,
  ArrowRight,
} from "lucide-react";
import { api } from "@/lib/api/client";

interface Announcement {
  id: string;
  title: string;
  body: string;
  type: string;
  pinned: boolean;
  linkLabel?: string;
  linkUrl?: string;
  startsAt?: string;
  endsAt?: string;
  publishedAt?: string;
  createdAt: string;
}

const TYPE_META: Record<
  string,
  { label: string; icon: typeof Info; chip: string; ring: string }
> = {
  general: { label: "Update", icon: Info, chip: "bg-navy-900/5 text-navy-700", ring: "text-navy-700" },
  stock: { label: "Stock Alert", icon: Flame, chip: "bg-red-50 text-red-700", ring: "text-red-600" },
  promo: { label: "Promo", icon: Tag, chip: "bg-amber-50 text-amber-700", ring: "text-amber-600" },
  price: { label: "Price News", icon: TrendingDown, chip: "bg-blue-50 text-blue-700", ring: "text-blue-600" },
  news: { label: "News", icon: Newspaper, chip: "bg-emerald-50 text-emerald-700", ring: "text-emerald-600" },
};

function metaFor(type: string) {
  return TYPE_META[type] ?? TYPE_META.general;
}

function formatWhen(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function Announcements() {
  const [items, setItems] = useState<Announcement[] | null>(null);

  useEffect(() => {
    let alive = true;
    api
      .get<{ announcements: Announcement[] }>("/announcements/active")
      .then((data) => {
        if (alive) setItems(data.announcements ?? []);
      })
      .catch(() => {
        if (alive) setItems([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="updates" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div data-reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            Latest Updates
          </span>
          <h2 className="mb-4 text-3xl font-bold text-navy-900 md:text-4xl">
            Announcements &amp; Price News
          </h2>
          <p className="text-lg text-slate-600">
            Stock availability, promo prices and the latest news from Malique —
            straight from our team.
          </p>
        </div>

        {/* Feed */}
        {items === null ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Megaphone className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-navy-900">No announcements right now</p>
            <p className="text-xs text-slate-500">
              Check back soon — we&apos;ll post the latest updates here the moment
              there&apos;s news.
            </p>
          </div>
        ) : (
          <div data-reveal-group className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => {
              const m = metaFor(a.type);
              const Icon = m.icon;
              const isInternal = !!a.linkUrl && a.linkUrl.startsWith("/");
              return (
                <article
                  key={a.id}
                  className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${m.chip}`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${m.ring}`} />
                      {m.label}
                    </span>
                    {a.pinned && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                        <Pin className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        Pinned
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-navy-900">{a.title}</h3>
                  <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                    {a.body}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <time className="text-xs text-slate-400">
                      {formatWhen(a.publishedAt || a.createdAt)}
                    </time>
                    {a.linkUrl &&
                      a.linkUrl !== "" &&
                      (isInternal ? (
                        <Link
                          href={a.linkUrl}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700"
                        >
                          {a.linkLabel || "View"} <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <a
                          href={a.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700"
                        >
                          {a.linkLabel || "View"} <ArrowRight className="h-4 w-4" />
                        </a>
                      ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
