import React from 'react';
import { ShoppingBag, Home, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Props {
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<Props> = ({ onCartClick, onSearch, searchQuery }) => {
  const { state } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">FoodHub</span>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-orange-50 rounded-full transition-colors"
          >
            <ShoppingBag className="h-6 w-6 text-gray-600" />
            {state.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};