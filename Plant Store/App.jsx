import React from "react";
import { Flower2, Leaf, ShoppingCart, Instagram, Facebook, Twitter } from "lucide-react";

const plants = [
  { id: 1, name: "Monstera Deliciosa 🌿", price: "$25", image: "https://i.ibb.co/0mB5bKT/monstera.jpg" },
  { id: 2, name: "Suculenta 🌵", price: "$10", image: "https://i.ibb.co/QnYX7xw/succulent.jpg" },
  { id: 3, name: "Orquídea ✨", price: "$30", image: "https://i.ibb.co/0JwZ5nK/orchid.jpg" },
];

export default function PlantStoreApp() {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Flower2 /> Tienda de Plantas
        </h1>
        <button className="flex items-center gap-2 bg-green-800 px-4 py-2 rounded-lg hover:bg-green-700 transition">
          <ShoppingCart /> Carrito
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div key={plant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{plant.name}</h2>
              <p className="text-green-600 font-bold">{plant.price}</p>
              <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white p-4 flex justify-between items-center">
        <p>© 2025 Tienda de Plantas. Todos los derechos reservados.</p>
        <div className="flex gap-3">
          <a href="#" className="hover:text-pink-200"><Instagram /></a>
          <a href="#" className="hover:text-pink-200"><Facebook /></a>
          <a href="#" className="hover:text-pink-200"><Twitter /></a>
        </div>
      </footer>
    </div>
  );
}

