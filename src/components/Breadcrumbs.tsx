import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BASE_URL } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const resolveItemUrl = (item: BreadcrumbItem, index: number) => {
    if (item.href) {
      return item.href.startsWith("http") ? item.href : `${BASE_URL}${item.href}`;
    }
    const slug = item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return index === 0 ? BASE_URL : `${BASE_URL}/${slug}`;
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: resolveItemUrl(item, index),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 text-foreground/30" />
              )}
              {isLast ? (
                <span className="text-foreground/50" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-foreground/50 transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : null}
            </div>
          );
        })}
      </nav>
    </>
  );
}
