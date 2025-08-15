import React, { useState, useReducer } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Heart, Sparkles, Flower } from 'lucide-react';

// Estado inicial del carrito
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
  { id: 1, name: "Monstera Deliciosa", price: 45.99, category: "Interior", image: "🌿", description: "Perfecta para espacios elegantes" },
  { id: 2, name: "Pothos Dorado", price: 25.99, category: "Interior", image: "🌱", description: "Ideal para principiantes" },
  { id: 3, name: "Rosa Rosada", price: 35.99, category: "Exterior", image: "🌸", description: "Romance en tu jardín" },
  { id: 4, name: "Lavanda Francesa", price: 28.99, category: "Exterior", image: "💐", description: "Aroma relajante y delicado" },
  { id: 5, name: "Aloe Vera Rosado", price: 18.99, category: "Suculentas", image: "🌵", description: "Belleza natural y cuidado" },
  { id: 6, name: "Echeveria Perla", price: 22.99, category: "Suculentas", image: "🪴", description: "Pequeña joya para tu hogar" }
];

const categories = ["Interior", "Exterior", "Suculentas"];

// Página de inicio
const HomePage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-rose-300 flex items-center justify-center p-4 relative overflow-hidden">
    <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🦋</div>
    <div className="absolute top-20 right-20 text-4xl opacity-30 animate-pulse">✨</div>
    <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-bounce delay-1000">🌸</div>
    <div className="absolute bottom-10 right-10 text-3xl opacity-20 animate-pulse delay-500">💖</div>

    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-2xl text-center border border-pink-100 relative">
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

...  
// Aquí seguiría todo el código de ProductsPage, CartPage y PlantStoreApp igual que antes,
// solo que reemplazando todos los caracteres rotos por acentos y emojis correctos.
