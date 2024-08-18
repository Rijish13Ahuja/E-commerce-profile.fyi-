import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

export default function Home({ addToCart }) {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000],
    rating: 0,
  });

  const applyFilters = (products) => {
    return products.filter(product => {
      const withinPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const meetsRatingCriteria = product.rating >= filters.rating;
      return withinPriceRange && meetsRatingCriteria && (!filters.category || product.category === filters.category);
    });
  };

  const filteredProducts = applyFilters(products);

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-white shadow-md">
        <h2 className="font-bold text-lg mb-4">Filters</h2>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Category</h3>
          <select
            className="w-full p-2 border rounded"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ ...filters, priceRange: [0, e.target.value] })}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>₹0</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Rating</h3>
          <select
            className="w-full p-2 border rounded"
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
          >
            <option value="0">All</option>
            <option value="4">4★ & Up</option>
            <option value="3">3★ & Up</option>
            <option value="2">2★ & Up</option>
            <option value="1">1★ & Up</option>
          </select>
        </div>
      </aside>

      <main className="w-3/4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}
