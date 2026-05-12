import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "All Categories",
    color: "All Colors",
    feature: "All Features",
    price: "All Prices",
    sort: "New In",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const colorDots = ["#F4D03F", "#94A3B8", "#6B7280", "#1F2937"];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

        * {
          font-family: 'DM Sans', sans-serif;
        }

        

        .page-hero {
          margin-bottom: 60px;
        }

        .page-title {
          font-size: 56px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: #000;
          margin-bottom: 24px;
          margin-top: 0;
        }

        .page-description {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: #1f2937;
          max-width: 600px;
          margin-bottom: 48px;
        }

        .filters-container {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          margin-bottom: 60px;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .filters-container::-webkit-scrollbar {
          display: none;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 32px;
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .filter-button:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .filter-button svg {
          width: 16px;
          height: 16px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        .product-card {
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
        }

        .product-image-wrapper {
          position: relative;
          margin-bottom: 20px;
          background: #f9fafb;
          aspect-ratio: 3/4;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 20px;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .color-dots {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
        }

        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .color-dot:hover {
          transform: scale(1.3);
        }

        .color-indicator {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          background: rgba(255, 255, 255, 0.95);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .product-name {
          font-size: 15px;
          font-weight: 600;
          color: #000;
          line-height: 1.4;
          margin-bottom: 8px;
          letter-spacing: -0.2px;
        }

        .product-description {
          font-size: 13px;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .product-price {
          font-size: 14px;
          font-weight: 600;
          color: #000;
          letter-spacing: -0.3px;
        }

        .loading-skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #e0e0e0 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .stagger-item {
          animation: fadeIn 0.5s ease-out backwards;
        }

        .stagger-item:nth-child(1) { animation-delay: 0.05s; }
        .stagger-item:nth-child(2) { animation-delay: 0.1s; }
        .stagger-item:nth-child(3) { animation-delay: 0.15s; }
        .stagger-item:nth-child(4) { animation-delay: 0.2s; }
        .stagger-item:nth-child(5) { animation-delay: 0.25s; }
        .stagger-item:nth-child(6) { animation-delay: 0.3s; }
        .stagger-item:nth-child(7) { animation-delay: 0.35s; }
        .stagger-item:nth-child(8) { animation-delay: 0.4s; }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .empty-state {
          text-align: center;
          padding: 80px 40px;
        }

        .empty-state-text {
          font-size: 16px;
          color: #6b7280;
          font-weight: 400;
        }
      `}</style>

      <Navbar  />
      <br/>
      <main className="px-8 lg:px-16 py-0">
        <div className="max-w-7xl mx-auto">
          {/* Page Hero */}


          {/* Filters */}
          <div className="filters-container">
            <button
              className="filter-button"
              onClick={() => handleFilterChange("category", "All Categories")}
            >
              Category
              <span>{filters.category}</span>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
            <button className="filter-button">
              Color
              <span>{filters.color}</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
            <button className="filter-button">
              Features
              <span>{filters.feature}</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
            <button className="filter-button">
              Price
              <span>{filters.price}</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
            <button className="filter-button">
              Sort
              <span>{filters.sort}</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="product-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="loading-skeleton rounded-lg h-64 mb-5"></div>
                  <div className="loading-skeleton h-4 rounded w-3/4 mb-3"></div>
                  <div className="loading-skeleton h-4 rounded w-1/2 mb-3"></div>
                  <div className="loading-skeleton h-4 rounded w-2/4"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map((product, index) => (
                <div key={product.id} className="stagger-item product-card">
                  {/* Product Image */}
                  <div className="product-image-wrapper">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                    {/* Color Dots */}
                    <div className="color-dots">
                      {colorDots.map((color, i) => (
                        <div
                          key={i}
                          className="color-dot"
                          style={{ backgroundColor: color }}
                          title={`Color option ${i + 1}`}
                        />
                      ))}
                    </div>
                    {/* Color Count */}
                    <div className="color-indicator">
                      ●{" "}
                      <span>
                        +{Math.floor(Math.random() * 3) + 1}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">
                    Premium quality material
                  </p>
                  <p className="product-price">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Products;