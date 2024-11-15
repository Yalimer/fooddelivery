import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetails } from './components/RestaurantDetails';
import { Cart } from './components/Cart';
import { Toast } from './components/Toast';
import { CheckoutModal } from './components/CheckoutModal';
import { restaurants } from './data';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedRestaurantData = restaurants.find(r => r.id === selectedRestaurant);
  const featuredRestaurants = restaurants.filter(r => r.featured);
  
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          onCartClick={() => setIsCartOpen(true)} 
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
        
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
        
        <main className="pt-16">
          {selectedRestaurantData ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <RestaurantDetails
                restaurant={selectedRestaurantData}
                onBack={() => setSelectedRestaurant(null)}
                onAddToCart={() => {
                  setToast('Item added to cart');
                }}
              />
            </div>
          ) : (
            <>
              <Hero />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {!searchQuery && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Featured Restaurants
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {featuredRestaurants.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                          onClick={setSelectedRestaurant}
                        />
                      ))}
                    </div>
                  </section>
                )}

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {searchQuery ? 'Search Results' : 'All Restaurants'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onClick={setSelectedRestaurant}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}
        </main>

        {toast && (
          <Toast message={toast} onClose={() => setToast(null)} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;