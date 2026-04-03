import ProductsClient from './ProductsClient';
import categoriesData from '@/data/categories.json';

// Dynamic SEO metadata generation
export async function generateMetadata({ searchParams }) {
  // Access searchParams safely, allowing compatibility directly with Next.js versions
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams?.category;

  if (categorySlug) {
    const group = categoriesData.find(g => g.slug === categorySlug);
    if (group) {
      return {
        title: `${group.title} | Metatech Industries`,
        description: `Explore our premium selection of ${group.title} and related industrial machinery by Metatech Industries, engineered for precision and reliability.`,
        openGraph: {
          title: `${group.title} | Metatech Industries`,
          description: `Explore our premium selection of ${group.title} industrial machinery.`,
          url: `https://metatech.com/products?category=${categorySlug}`,
        },
      };
    }
  }

  return {
    title: 'Precision Engineering Catalog | Metatech Industries',
    description: 'High-performance industrial machinery engineered for laboratory-grade accuracy and high-throughput production environments by Metatech Industries.',
    openGraph: {
      title: 'Precision Engineering Catalog | Metatech Industries',
      description: 'High-performance industrial machinery engineered for laboratory-grade accuracy.',
      url: 'https://metatech.com/products',
    },
  };
}

export default function ProductsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Precision Engineering Catalog",
    "description": "High-performance industrial machinery engineered for laboratory-grade accuracy and high-throughput production environments.",
    "publisher": {
      "@type": "Organization",
      "name": "Metatech Industries",
      "logo": {
        "@type": "ImageObject",
        "url": "https://metatech.com/images/metatech_logo.png"
      }
    }
  };

  return (
    <>
      {/* Inject Structured Data for SEO Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Client Component carrying the actual UI and interactive state */}
      <ProductsClient />
    </>
  );
}
