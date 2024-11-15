import React from 'react';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  item: MenuItem;
  onAddToCart: () => void;
}

export const MenuCard: React.FC<Props> = ({ item, onAddToCart }) => {
  const { state, dispatch } = useCart();
  const isInCart = state.items.some(cartItem => cartItem.id === item.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    onAddToCart();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow">
      <div className="flex space-x-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <p className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className={`p-2 rounded-full transition-all transform hover:scale-105 ${
          isInCart 
            ? 'bg-green-100 text-green-500 hover:bg-green-200' 
            : 'bg-orange-100 text-orange-500 hover:bg-orange-200'
        }`}
      >
        {isInCart ? <Check className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
};