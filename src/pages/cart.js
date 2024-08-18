import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function CartPage({ cart, removeFromCart, addToCart }) {
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const applyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(subtotal * 0.10); 
    } else if (discountCode === 'SAVE50') {
      setDiscount(50); 
    } else {
      setDiscount(0); 
      alert('Invalid discount code');
    }
  };

  const total = subtotal - discount;

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push('/')} className="text-blue-600 hover:underline">
          &larr; Back to Shopping
        </button>
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="mb-8 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                    >
                      +
                    </button>
                    <span className="mx-2 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xl font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={applyDiscount}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
              >
                Apply Discount
              </button>
            </div>

            {discount > 0 && (
              <div className="flex justify-between mb-2">
                <span>Discount:</span>
                <span className="text-green-600">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between mb-4 font-bold text-lg">
              <span>Total:</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => alert('Proceeding to checkout...')}
              className="bg-green-600 text-white py-3 px-6 rounded-lg w-full hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
