import { useRouter } from 'next/router';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json'; 

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(q?.toLowerCase() || '')
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{q}"</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={() => {}} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
