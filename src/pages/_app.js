import '../styles/globals.css';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    setToastMessage(`${product.name} added to cart`);
    setToastVisible(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });

    setToastMessage(`Item removed from cart`);
    setToastVisible(true);
  };

  const closeToast = () => setToastVisible(false);

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Component {...pageProps} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />
      <Toast message={toastMessage} isVisible={toastVisible} onClose={closeToast} />
    </>
  );
}

export default MyApp;
