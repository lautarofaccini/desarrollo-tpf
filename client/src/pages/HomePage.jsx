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


    </main>
  )
}

export default HomePage