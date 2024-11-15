import React from 'react';
import { ArrowLeft, Clock, Star, MapPin } from 'lucide-react';
import { Restaurant } from '../types';
import { MenuCard } from './MenuCard';
import { menuItems } from '../data';

interface Props {
  restaurant: Restaurant;
  onBack: () => void;
  onAddToCart: () => void;
}

export const RestaurantDetails: React.FC<Props> = ({ restaurant, onBack, onAddToCart }) => {
  const restaurantMenu = menuItems.filter(item => item.restaurantId === restaurant.id);

  return (
    <div className="space-y-6">
      <div className="relative h-72">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
          <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-white">
            <span className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
              {restaurant.rating}
            </span>
            <span className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              {restaurant.deliveryTime} mins
            </span>
            <span className="flex items-center">
              <MapPin className="h-5 w-5 mr-1" />
              {restaurant.cuisine}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">About</h2>
          <p className="text-gray-600">
            Experience the authentic flavors of {restaurant.cuisine} cuisine. 
            Minimum order: ${restaurant.minimumOrder}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <div className="space-y-4">
          {restaurantMenu.map((item) => (
            <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};