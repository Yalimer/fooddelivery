import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Restaurant } from '../types';

interface Props {
  restaurant: Restaurant;
  onClick: (id: string) => void;
}

export const RestaurantCard: React.FC<Props> = ({ restaurant, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onClick(restaurant.id)}
    >
      <div className="relative h-48">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {restaurant.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium">{restaurant.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{restaurant.deliveryTime} mins</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-gray-600">
            Min. order: ${restaurant.minimumOrder}
          </p>
        </div>
      </div>
    </div>
  );
};