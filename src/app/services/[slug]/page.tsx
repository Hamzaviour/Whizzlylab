import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, getAllServiceSlugs } from "@/lib/services";
import ServiceDetail from "@/components/ServiceDetail";

import { BASE_URL, ogImage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  const canonicalUrl = `${BASE_URL}/services/${slug}`;
  return {
    title: `${service.title} Services`,
    description: service.short,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} Services | Whizzly Lab`,
      description: service.short,
      url: canonicalUrl,
      type: "website",
      siteName: "Whizzly Lab",
      images: [
        {
          url: `${BASE_URL}/services/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${service.title} — Whizzly Lab AI Studio`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} Services | Whizzly Lab`,
      description: service.short,
      images: [`${BASE_URL}/services/${slug}/opengraph-image`],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.short,
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Whizzly Lab",
      url: BASE_URL,
    },
    url: `${BASE_URL}/services/${slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
