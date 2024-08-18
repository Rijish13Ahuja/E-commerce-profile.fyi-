import React, { useEffect } from 'react';

export default function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    isVisible && (
      <div className="fixed bottom-4 right-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
        {message}
      </div>
    )
  );
}
