import React from 'react';

export default function CartSummary({ cartItems, applyDiscount }) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 0; 
  const total = subtotal - discount;

  return (
    <div className="p-4 border-t mt-4">
      <h2 className="text-lg font-semibold">Cart Summary</h2>
      <p className="mt-2">Subtotal: ₹{subtotal}</p>
      <p>Discount: ₹{discount}</p>
      <p className="text-xl font-bold mt-2">Total: ₹{total}</p>
      <button
        className="bg-green-500 text-white mt-4 p-2 rounded-lg w-full hover:bg-green-600 transition"
      >
        Checkout
      </button>
    </div>
  );
}
