import React from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'

function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Seccion de inicio */}
      <section className="relative h-screen">
        <img
          src="/FU-Bienal2024.jpg"
          alt="Fondo Bienal"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
          <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-black stroke-text">La Bienal 2024</h1>
          <p className="text-xl md:text-2xl text-black stroke-text-sm">Una exposición única de arte y escultura contemporánea</p>
          </div>
        </div>
      </section>

      
      {/* Section de fotos de la bienal */}
      <section className="py-16 px-4 md:px-8 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestras Esculturas</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="flex-none w-64 h-80">
              <img
                src={`/escultura${index + 1}.jpg`}
                alt={`Escultura ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

export default HomePage