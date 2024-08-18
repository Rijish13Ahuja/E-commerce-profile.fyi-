import React from 'react';

export default function CartItem({ item, updateQuantity, removeItem }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-500">₹{item.price} x {item.quantity}</p>
        <div className="mt-2 flex items-center">
          <button
            className="bg-gray-200 px-2 py-1 rounded-lg mr-2"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="bg-gray-200 px-2 py-1 rounded-lg ml-2"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="text-red-500 hover:text-red-700 transition"
        onClick={() => removeItem(item.id)}
      >
        Remove
      </button>
    </div>
  );
}
