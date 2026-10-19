import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { TapePair } from "@/components/decorative/TapePair";
import { getCaseStudy, caseStudies } from "@/data/caseStudies";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

/** generateStaticParams — juga dari data; studi kasus baru otomatis SSG. */
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: { absolute: study.metaTitle },
    description: study.metaDescription,
    alternates: {
      canonical: `/portofolio/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const dateLabel = new Date(study.datePublished).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: study.title,
          description: study.metaDescription,
          datePublished: study.datePublished,
          dateModified: study.datePublished,
          path: `/portofolio/${study.slug}`,
          image: study.image,
          authorName: "Ananta",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Portofolio", path: "/#portofolio" },
          { name: study.title, path: `/portofolio/${study.slug}` },
        ])}
      />

      <main id="konten" className="relative bg-surface">
        <TapePair className="left-6 top-16" tone="bg-blue" tone2="bg-yellow" />
        <article className="container max-w-3xl py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="underline-offset-4 hover:underline">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#portofolio" className="underline-offset-4 hover:underline">
                  Portofolio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {study.title}
              </li>
            </ol>
          </nav>

          <header className="mt-6">
            <p className="font-display text-sm font-bold uppercase tracking-wide text-pink">
              Studi kasus · {study.category}
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.6rem,5vw,2.5rem)] font-bold leading-tight text-ink">
              {study.title}
            </h1>
            <p className="mt-3 text-sm text-ink/60">
              {dateLabel} · Konsep desain (belum ada klien nyata)
            </p>
            <p className="mt-4 leading-relaxed text-ink/80">{study.summary}</p>
          </header>

          <Image
            src={study.image}
            alt={study.imageAlt}
            width={1200}
            height={630}
            priority
            className="mt-6 w-full rounded-card border-2 border-ink shadow-brutal"
          />

          <section aria-labelledby="cs-problem" className="mt-10">
            <h2 id="cs-problem" className="font-display text-xl font-bold text-ink">
              Masalah
            </h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-ink/80">
              {study.problem.map((line, index) => (
                <li key={index} className="leading-relaxed">{line}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cs-solution" className="mt-8">
            <h2 id="cs-solution" className="font-display text-xl font-bold text-ink">
              Solusi
            </h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-ink/80">
              {study.solution.map((line, index) => (
                <li key={index} className="leading-relaxed">{line}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cs-results" className="mt-8">
            <h2 id="cs-results" className="font-display text-xl font-bold text-ink">
              Hasil (target — berlabel demo)
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              Belum ada klien, belum ada angka hasil nyata. Yang ditampilkan adalah target yang akan diukur setelah launch.
            </p>
            <dl className="mt-4 flex flex-col gap-3">
              {study.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-card border-2 border-ink bg-surface p-4 shadow-brutal"
                >
                  <dt className="font-display text-sm font-bold">{result.label}</dt>
                  <dd className="mt-1 text-ink/80">
                    {result.value}
                    {result.demo && (
                      <span className="ml-2 inline-block rounded-full border-2 border-ink bg-blue px-2 py-0.5 text-xs font-bold">
                        Demo
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-12 rounded-card border-2 border-ink bg-yellow p-6">
            <h2 className="font-display text-lg font-bold">
              Ingin hasil seperti ini untuk usahamu?
            </h2>
            <p className="mt-2 text-ink/80">
              Bandingkan paket, hitung perkiraan biaya, lalu konsultasi tanpa komitmen.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/#paket"
                className="rounded-card border-[3px] border-ink bg-yellow px-6 py-3 font-display font-bold shadow-brutal transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm"
              >
                Lihat paket →
              </Link>
              <Link
                href="/harga"
                className="rounded-card border-2 border-ink bg-surface px-6 py-3 font-display font-bold shadow-brutal transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm"
              >
                Simulasi harga →
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
