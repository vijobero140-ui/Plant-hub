import React, { useState, useReducer } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Heart, Sparkles, Flower } from 'lucide-react';

// Simulación del CartSlice de Redux
const initialState = {
  items: [],
  disabledButtons: []
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'addItem':
      const plant = action.payload;
      const existingItem = state.items.find(item => item.id === plant.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => 
            item.id === plant.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...plant, quantity: 1 }],
          disabledButtons: [...state.disabledButtons, plant.id]
        };
      }
    
    case 'removeItem':
      const plantId = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.id !== plantId),
        disabledButtons: state.disabledButtons.filter(id => id !== plantId)
      };
    
    case 'updateQuantity':
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      };
    
    default:
      return state;
  }
};

// Datos de las plantas
const plants = [
  // Plantas de Interior
  { id: 1, name: "Monstera Deliciosa", price: 45.99, category: "Interior", image: "🌿", description: "Perfecta para espacios elegantes" },
  { id: 2, name: "Pothos Dorado", price: 25.99, category: "Interior", image: "🌱", description: "Ideal para principiantes" },
  
  // Plantas de Exterior
  { id: 3, name: "Rosa Rosada", price: 35.99, category: "Exterior", image: "🌸", description: "Romance en tu jardín" },
  { id: 4, name: "Lavanda Francesa", price: 28.99, category: "Exterior", image: "💜", description: "Aroma relajante y delicado" },
  
  // Suculentas
  { id: 5, name: "Aloe Vera Rosado", price: 18.99, category: "Suculentas", image: "🌵", description: "Belleza natural y cuidado" },
  { id: 6, name: "Echeveria Perla", price: 22.99, category: "Suculentas", image: "🪴", description: "Pequeña joya para tu hogar" }
];

const categories = ["Interior", "Exterior", "Suculentas"];

// Componente HomePage
const HomePage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-rose-300 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Decoraciones de fondo */}
    <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🦋</div>
    <div className="absolute top-20 right-20 text-4xl opacity-30 animate-pulse">✨</div>
    <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-bounce delay-1000">🌸</div>
    <div className="absolute bottom-10 right-10 text-3xl opacity-20 animate-pulse delay-500">💖</div>
    
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-2xl text-center border border-pink-100 relative">
      {/* Decoración superior */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-100 rounded-full p-3">
        <Heart className="w-8 h-8 text-pink-500" />
      </div>
      
      <div className="mb-8 pt-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-12 h-12 text-pink-500 animate-spin" />
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text">
            Flora Bella
          </h1>
          <Sparkles className="w-12 h-12 text-pink-500 animate-spin" />
        </div>
        <h2 className="text-2xl text-purple-600 font-semibold italic">Tu jardín de ensueño te espera</h2>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-700 text-lg leading-relaxed">
          Bienvenida a Flora Bella, donde cada planta es seleccionada con amor y cuidado especial. 
          Transformamos tu hogar en un oasis de belleza natural con las plantas más hermosas y delicadas. 
          Descubre nuestra colección única, perfecta para crear espacios llenos de armonía y feminidad.
        </p>
      </div>
      
      <button 
        onClick={() => onNavigate('products')}
        className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-12 rounded-full text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-pink-300/50 border-2 border-white"
      >
        Explorar Colección 🌸
      </button>
      
      <div className="mt-6 flex justify-center gap-4 text-2xl">
        <span className="animate-bounce">💕</span>
        <span className="animate-bounce delay-200">🌺</span>
        <span className="animate-bounce delay-400">🦋</span>
      </div>
    </div>
  </div>
);

// Componente ProductsPage
const ProductsPage = ({ onNavigate, cartState, dispatch }) => {
  const getTotalItems = () => cartState.items.reduce((total, item) => total + item.quantity, 0);

  const addItem = (plant) => {
    dispatch({ type: 'addItem', payload: plant });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center border border-pink-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('home')}
              className="text-pink-600 hover:text-pink-800 font-semibold text-lg transition-colors flex items-center gap-2"
            >
              ← <Heart className="w-5 h-5" /> Inicio
            </button>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text flex items-center gap-3">
                <Flower className="w-8 h-8 text-pink-500" />
                Nuestra Colección Especial
              </h1>
              <p className="text-purple-600 italic">Plantas elegidas con amor para ti</p>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate('cart')}
            className="relative bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white p-4 rounded-full transition-all transform hover:scale-110 shadow-lg border-2 border-white"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-7 h-7 text-sm flex items-center justify-center font-bold animate-pulse border-2 border-white">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Productos por categoría */}
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text mb-8 border-b-4 border-pink-200 pb-4 flex items-center gap-3">
              <span className="text-4xl">
                {category === 'Interior' ? '🏠' : category === 'Exterior' ? '🌺' : '💖'}
              </span>
              {category}
              <Sparkles className="w-6 h-6 text-pink-400" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plants.filter(plant => plant.category === category).map(plant => (
                <div key={plant.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100 relative group">
                  {/* Decoración en esquina */}
                  <div className="absolute top-4 right-4 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-6 h-6" />
                  </div>
                  
                  <div className="h-52 bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 flex items-center justify-center relative overflow-hidden">
                    <span className="text-8xl animate-bounce group-hover:scale-110 transition-transform">{plant.image}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
                    {/* Brillos decorativos */}
                    <div className="absolute top-4 left-4 text-yellow-300 opacity-60 animate-pulse">✨</div>
                    <div className="absolute bottom-4 right-4 text-pink-300 opacity-60 animate-pulse delay-500">💫</div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">{plant.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 italic">{plant.description}</p>
                    <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text mb-4">
                      ${plant.price}
                    </p>
                    <button
                      onClick={() => addItem(plant)}
                      disabled={cartState.disabledButtons.includes(plant.id)}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                        cartState.disabledButtons.includes(plant.id)
                          ? 'bg-pink-100 text-pink-400 cursor-not-allowed border-pink-200'
                          : 'bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white hover:shadow-lg transform hover:scale-105 border-white'
                      }`}
                    >
                      {cartState.disabledButtons.includes(plant.id) 
                        ? '✨ En tu carrito' 
                        : '💕 Añadir con amor'
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente CartPage
const CartPage = ({ onNavigate, cartState, dispatch }) => {
  const getTotalItems = () => cartState.items.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const removeItem = (plantId) => {
    dispatch({ type: 'removeItem', payload: plantId });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'updateQuantity', payload: { id, quantity } });
    }
  };

  const handleIncrement = (plantId) => {
    const item = cartState.items.find(item => item.id === plantId);
    if (item) {
      updateQuantity(plantId, item.quantity + 1);
    }
  };

  const handleDecrement = (plantId) => {
    const item = cartState.items.find(item => item.id === plantId);
    if (item && item.quantity > 1) {
      updateQuantity(plantId, item.quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center border border-pink-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('products')}
              className="text-pink-600 hover:text-pink-800 font-semibold text-lg transition-colors flex items-center gap-2"
            >
              ← <Flower className="w-5 h-5" /> Seguir comprando
            </button>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-pink-500" />
                Mi Carrito de Plantas
              </h1>
              <p className="text-purple-600 italic">Tus tesoros vegetales seleccionados</p>
            </div>
          </div>
        </div>

        {cartState.items.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-pink-100">
            <div className="text-8xl mb-6 animate-bounce">🌸</div>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">Tu carrito está esperando amor 💕</h2>
            <p className="text-gray-500 text-lg mb-6 italic">Agrega algunas plantas hermosas para crear tu jardín de ensueño</p>
            <button 
              onClick={() => onNavigate('products')}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105 border-2 border-white"
            >
              Descubrir Plantas 🌺
            </button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-pink-100">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-pink-400" />
                Mis Plantas Elegidas: {getTotalItems()}
              </h2>
              
              {cartState.items.map(item => (
                <div key={item.id} className="flex items-center gap-6 p-6 border-b border-pink-100 last:border-b-0 hover:bg-pink-50/50 rounded-lg transition-colors group">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 rounded-2xl flex items-center justify-center shadow-md relative">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{item.image}</span>
                    <div className="absolute -top-1 -right-1 text-pink-300">✨</div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 font-serif">{item.name}</h3>
                    <p className="text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text font-bold text-lg">
                      ${item.price}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantity <= 1}
                      className="w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors border border-pink-200"
                    >
                      <Minus className="w-5 h-5 text-pink-600" />
                    </button>
                    
                    <span className="w-12 text-center font-bold text-xl bg-gradient-to-r from-pink-100 to-purple-100 py-2 rounded-lg border border-pink-200">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="w-10 h-10 rounded-full bg-pink-200 hover:bg-pink-300 flex items-center justify-center transition-colors border border-pink-200"
                    >
                      <Plus className="w-5 h-5 text-pink-600" />
                    </button>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 p-3 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-pink-100 relative">
              <div className="absolute top-4 right-4 text-pink-300 animate-pulse">💖</div>
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-pink-400" />
                Resumen de tu Pedido
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-xl font-semibold">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold">
                  <span>Envío con amor:</span>
                  <span className="text-pink-500 flex items-center gap-2">
                    Gratis <Heart className="w-5 h-5" />
                  </span>
                </div>
                <div className="border-t-2 border-pink-200 pt-4">
                  <div className="flex justify-between text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-6 rounded-2xl text-2xl transition-all transform hover:scale-105 shadow-lg border-2 border-white flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />
                Finalizar con Amor
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Aplicación Principal
const PlantStoreApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  switch (currentPage) {
    case 'home':
      return <HomePage onNavigate={handleNavigate} />;
    case 'products':
      return <ProductsPage onNavigate={handleNavigate} cartState={cartState} dispatch={dispatch} />;
    case 'cart':
      return <CartPage onNavigate={handleNavigate} cartState={cartState} dispatch={dispatch} />;
    default:
      return <HomePage onNavigate={handleNavigate} />;
  }
};

export default PlantStoreApp;
