"use client";
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CategorySidebar from '@/components/CategorySidebar';
import SearchBarWithSuggestions from '@/components/SearchBarWithSuggestions';
import ProductGrid from '@/components/ProductGrid';
import { products, consumables } from '@/data/categories';
import categoriesData from '@/data/categories.json';
import consumablesData from '@/data/consumables.json';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Custom image mappings for top-level categories
  const categoryImageMap = {
    'cutting': '/bgremoved%20homepage%20slider%20images/autocut-removebg-preview.png',
    'moulding-grinding-polishing': '/bgremoved%20homepage%20slider%20images/electro-hydraulic-press-removebg-preview.png',
    'microscope-and-image-analyzer': '/bgremoved%20homepage%20slider%20images/metagraph-I-removebg-preview.png',
    'micro-hardness-tester': '/bgremoved%20homepage%20slider%20images/brinell-hardness-tester1-removebg-preview.png',
    'other-machines': '/bgremoved%20homepage%20slider%20images/vertical-band-saw-removebg-preview.png',
    'consumables': '/images/metallographyconsumables.png'
  };
  const allGroups = useMemo(() => [
    ...categoriesData,
    {
      title: "Laboratory Consumables",
      slug: "consumables",
      categories: consumablesData.map(c => ({
        name: c.title,
        slug: c.slug,
        subcategories: c.items
      }))
    }
  ], [categoriesData, consumablesData]);

  // Consumables Mapping Data
  const consumablesMeta = {
    'cutting-sectioning': {
      desc: 'Precision abrasive cut-off wheels and lubricants formulated for optimal metallographic preparation across all material grades.',
      img: '/consumables images/Abrasive cut off wheels.png'
    },
    'moulding': {
      desc: 'Superior hot and cold mounting powders, resins, and silicone moulds designed for maximum edge retention and sample stability.',
      img: '/consumables images/bakelite or phenolic hot moulding powder.png'
    },
    'grinding': {
      desc: 'Comprehensive range of Silicon Carbide paper, diamond grinding discs, and magnetic fixation systems for systematic surface leveling.',
      img: '/consumables images/abrasive grinding disc.png'
    },
    'polishing': {
      desc: 'Diamond pastes, suspensions, and premium cloths engineered to achieve mirror-like, scratch-free finishes for metallurgical analysis.',
      img: '/consumables images/polishing cloths.png'
    },
    'in-situ-metallography': {
      desc: 'Mobile preparation kits including portable grinding discs, polishing cloths, and replica materials for field metallography.',
      img: '/consumables images/grinding disc and polishing cloths.png'
    },
    'millipore-fluid-contamination-analysis': {
      desc: 'Specialized analysis kits featuring high-precision vacuum pumps, filter membranes, and dispensers for fluid purity testing.',
      img: '/consumables images/vacuum-pressure-pump.png'
    },
    'hardness-testing': {
      desc: 'Certified hardness test blocks and precision diamond indenters for Rockwell, Vickers, and Brinell hardness verification.',
      img: '/consumables images/rockwell hardness tester.png'
    },
    'magnetic-particle-inspection': {
      desc: 'Advanced magnetic powders, carrier oils, and UV lamps for high-sensitivity non-destructive testing (NDT) applications.',
      img: '/images/hardnesstestblocksdiamond.png'
    }
  };

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    category: searchParams.get('category') || null,
    subcategory: searchParams.get('subcategory') || null
  });

  // Hydrate from URL if it changes (e.g. from Navbar)
  useEffect(() => {
    const cat = searchParams.get('category');
    const sub = searchParams.get('subcategory');
    if (cat || sub) {
      setSelectedCategory({ category: cat, subcategory: sub });
    }
  }, [searchParams]);

  // Debouncing search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Combined list of all preparative resources
  const allProducts = useMemo(() => [
    ...products.map(p => ({ ...p, type: 'machine' })),
    ...consumables.map(c => ({ ...c, type: 'consumable' }))
  ], [products, consumables]);

  // Combined Filtering Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Filter by Category/Group
      if (selectedCategory.subcategory) {
        if (product.categorySlug !== selectedCategory.subcategory && product.slug !== selectedCategory.subcategory) {
          return false;
        }
      } else if (selectedCategory.category) {
        const group = allGroups.find(g => g.slug === selectedCategory.category);
        if (group) {
          const categorySlugs = group.categories.map(c => c.slug);
          if (!categorySlugs.includes(product.categorySlug)) {
            return false;
          }
        }
      }

      // Filter by Search Query
      if (debouncedSearchQuery) {
        const query = debouncedSearchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesTitle = product.title?.toLowerCase().includes(query);
        const matchesDesc = product.description?.toLowerCase().includes(query);
        const matchesTag = product.tag?.toLowerCase().includes(query);
        const matchesDetail = product.detail?.toLowerCase().includes(query);

        if (!(matchesName || matchesTitle || matchesDesc || matchesTag || matchesDetail)) {
          return false;
        }
      }

      return true;
    });
  }, [debouncedSearchQuery, selectedCategory]);

  const handleSelectCategory = (category, subcategory) => {
    setSelectedCategory({ category, subcategory });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Mapping products to include category/series for ProductCard if needed
  const displayProducts = filteredProducts.map(p => ({
    ...p,
    category: p.tag || p.categorySlug?.replace(/-/g, ' '),
    series: p.detail || p.name
  }));

  // Helper to find category/group names for breadcrumbs
  const getBreadcrumbLabels = () => {
    const labels = [{ name: 'Home', link: '/' }, { name: 'Products', link: '/products', active: !selectedCategory.category }];

    if (selectedCategory.category) {
      const group = allGroups.find(g => g.slug === selectedCategory.category);
      if (group) {
        labels.push({
          name: group.title,
          active: !selectedCategory.subcategory,
          onClick: () => handleSelectCategory(group.slug, null)
        });
      }
    }

    if (selectedCategory.subcategory) {
      const group = allGroups.find(g => g.slug === selectedCategory.category);
      const cat = group?.categories.find(c => c.slug === selectedCategory.subcategory);
      if (cat) {
        labels.push({ name: cat.name, active: true });
      }
    }

    return labels;
  };

  const breadcrumbs = getBreadcrumbLabels();

  // Determine if we show the top-level categories instead of products
  const isCategoryGateway = !selectedCategory.category && !selectedCategory.subcategory && !debouncedSearchQuery;

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width Header Section with Light Blue Background */}
      <section className="bg-[#f0f7fd] w-full pt-16 pb-12 border-b border-[#e2e8f0]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-[#1E6FA8]"></span>
                <span className="text-[12px] font-bold tracking-[0.2em] text-[#1E6FA8]">Industrial Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a3c5a] mb-4">
                Precision Engineering Catalog
              </h1>
              <p className="text-[#64748b] text-base md:text-lg leading-relaxed">
                High-performance industrial machinery engineered for laboratory-grade accuracy and high-throughput production environments.
              </p>
            </div>
          </header>
        </div>
      </section>

      <main className="max-w-[1920px] mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <CategorySidebar
            categories={allGroups}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Product Section */}
          <section className="flex-grow">
            {/* Condensed Navigation Block */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-slate-100 pb-8">
              <div className="flex flex-col gap-1.5 min-w-0">
                {/* Back Button (Conditional) */}
                {(selectedCategory.category || selectedCategory.subcategory) && (
                  <button
                    onClick={() => {
                      if (selectedCategory.subcategory) {
                        handleSelectCategory(selectedCategory.category, null);
                      } else {
                        handleSelectCategory(null, null);
                      }
                    }}
                    className="flex items-center gap-2 text-[#1E6FA8] hover:text-[#1a3c5a] transition-all font-bold text-[12px] tracking-wider w-fit group mb-1"
                  >
                    <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to {selectedCategory.subcategory ?
                      (allGroups.find(g => g.slug === selectedCategory.category)?.title || 'Products') :
                      'Products category'}
                  </button>
                )}

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[16px] font-medium tracking-tight overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-[#cbd5e1] text-[14px] font-normal mx-1">/</span>}
                      {crumb.active ? (
                        <span className="text-[#1a3c5a] first-letter:uppercase flex items-center gap-1.5">
                          {crumb.name.toLowerCase()}
                        </span>
                      ) : crumb.onClick ? (
                        <button
                          onClick={crumb.onClick}
                          className="text-[#94a3b8] hover:text-[#1E6FA8] transition-colors first-letter:uppercase flex items-center gap-1.5"
                        >
                          {crumb.name.toLowerCase()}
                        </button>
                      ) : (
                        <Link
                          href={crumb.link}
                          className="text-[#94a3b8] hover:text-[#1E6FA8] transition-colors first-letter:uppercase flex items-center gap-1.5"
                        >
                          {crumb.name.toLowerCase()}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </nav>

                {/* Showing Results - Tightly nested below breadcrumbs (Hide in gateway mode) */}
                {!isCategoryGateway && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[12px] font-medium text-[#94a3b8]">Showing</span>
                    <span className="text-[12px] font-bold text-[#1a3c5a]">{filteredProducts.length} results</span>
                  </div>
                )}
              </div>

              {/* Right Side: Search Box */}
              <div className="w-full md:w-auto flex-shrink-0">
                <SearchBarWithSuggestions
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  products={products}
                />
              </div>
            </div>

            {isCategoryGateway ? (
              <div className="space-y-20">
                {/* Precision Machinery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allGroups.map(cat => (
                    <Link
                      key={cat.slug}
                      href={cat.slug === 'consumables' ? '#consumables-section' : `/products?category=${cat.slug}`}
                      className="group bg-white border border-slate-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col"
                      onClick={(e) => {
                        if (cat.slug === 'consumables') {
                          e.preventDefault();
                          document.getElementById('consumables-section')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <div className="h-48 w-full bg-white relative overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={categoryImageMap[cat.slug] || cat.image || `/images/${cat.slug}.jpg`}
                          alt={cat.title}
                          className="w-full h-full object-contain scale-[1.15] group-hover:scale-[1.25] transition-transform duration-500 drop-shadow-sm"
                          onError={(e) => {
                            if (!e.currentTarget.src.includes('placeholder')) {
                              e.currentTarget.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(cat.title.toUpperCase())}`;
                            }
                          }}
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow items-start justify-between">
                        <div className="mb-4">
                          <h3 className="text-[16px] font-bold text-[#1a3c5a] capitalize">{cat.title.replace(/-/g, ' ')}</h3>
                          {cat.description && <p className="text-[12px] text-slate-500 mt-2 line-clamp-2">{cat.description}</p>}
                        </div>
                        <button className="text-[12px] font-bold text-[#1E6FA8] tracking-wider flex items-center gap-1 group-hover:text-[#1a3c5a] transition-colors mt-auto">
                          {cat.slug === 'consumables' ? 'View Consumables' : 'Explore'} <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Laboratory Consumables Section (Horizontal Cards) */}
                <div id="consumables-section" className="scroll-mt-24 pt-10 border-t border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-[2px] bg-[#1E6FA8]"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#1E6FA8] uppercase">Catalog Extension</span>
                      </div>
                      <h2 className="text-3xl font-black text-[#1a3c5a] tracking-tighter uppercase">Laboratory Consumables</h2>
                      <p className="text-slate-500 text-sm mt-2 font-medium">Standard-grade metallurgical preparation accessories and consumables.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {consumablesData.map((con, idx) => (
                      <Link 
                        key={con.slug}
                        href={`/products?category=consumables&subcategory=${con.slug}`}
                        className="group flex flex-col md:flex-row bg-white border border-slate-100 rounded-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="w-full md:w-56 h-40 md:h-auto bg-slate-50 overflow-hidden flex-shrink-0">
                          <img 
                            src={consumablesMeta[con.slug]?.img || '/images/placeholder.png'} 
                            alt={con.title}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 p-4"
                          />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-[#1a3c5a] tracking-tight">{con.title}</h3>
                            <span className="material-symbols-outlined text-4xl text-[#1E6FA8] opacity-50 group-hover:opacity-100 transition-opacity leading-none">
                              {con.icon}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mb-6">
                            {consumablesMeta[con.slug]?.desc || 'High-performance consumables designed for precision metallurgical laboratory applications.'}
                          </p>
                          <div className="mt-auto flex items-center gap-2 text-[11px] font-bold text-[#1E6FA8] uppercase tracking-wider group-hover:text-[#1a3c5a] transition-colors">
                            Explore range <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ProductGrid filteredProducts={displayProducts} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1E6FA8] border-t-transparent rounded-full animate-spin"></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
