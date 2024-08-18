import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Navbar({ cartCount, products }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <nav className="bg-blue-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold flex items-center space-x-2">
          <span>Profile.fyi</span>
        </Link>

        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search for products, brands, and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-full outline-none text-gray-700"
          />
          <button type="submit" className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white">
            <FaSearch />
          </button>
        </form>

        <div className="flex items-center space-x-6 text-white">
          <div className="relative group">
            <FaUserCircle className="text-2xl cursor-pointer" />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</Link>
              <Link href="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Orders</Link>
              <Link href="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Wishlist</Link>
              <Link href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</Link>
            </div>
          </div>

          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            <span
              className="bg-yellow-500 text-black text-xs rounded-full px-2 py-1 absolute"
              style={{ top: '-10px', right: '-10px' }}
            >
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
