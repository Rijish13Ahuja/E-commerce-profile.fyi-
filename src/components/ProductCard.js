import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ product, addToCart }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white relative">
      <div className="flex justify-center h-48">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      <h2 className="text-lg font-bold mt-2 line-clamp-2 h-12">
        {product.name || 'Unnamed Product'}
      </h2>

      <div className="flex items-center mt-1">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="text-gray-700">
          {product.rating !== undefined ? product.rating.toFixed(1) : 'N/A'}
        </span>
        <span className="text-gray-500 ml-2">
          ({product.reviewsCount || 0} ratings)
        </span>
      </div>

      <div className="mt-2">
        <span className="text-lg font-semibold text-blue-600">
          ₹{product.price ? product.price.toLocaleString('en-IN') : 'N/A'}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-500 line-through ml-2">
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>
        )}
        {product.discount && (
          <span className="text-sm text-red-600 ml-2">
            ({product.discount}% Off)
          </span>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className={`py-2 px-4 w-full rounded-lg transition-colors ${
            isAdding
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    reviewsCount: PropTypes.number,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};
