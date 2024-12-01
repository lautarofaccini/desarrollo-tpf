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

      {/* Seccion de informacion sobre la bienal */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Sobre la Bienal</h2>
          <p className="text-lg text-gray-300 mb-6">
            La Bienal del Chaco es un evento internacional de escultura que reúne a artistas de todo el mundo.
            Durante este evento, podrás explorar una impresionante colección de obras de artistas reconocidos y emergentes.
          </p>
          <p className="text-lg text-gray-300">
            Descubre instalaciones, pinturas, esculturas y más, diseñadas para desafiar tus sentidos e inspirar
            nuevas perspectivas sobre el arte contemporáneo.
          </p>
        </div>
      </section>

            {/* Seccion de como llegar */}
            <section className="py-16 px-4 md:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
            Mapa de ubicación
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Cómo Llegar</h2>
            <div className="space-y-4">
              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                Av. Sarmiento 1100, Resistencia, Chaco
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">Indicaciones:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Desde el centro, tomar Av. Sarmiento hacia el norte</li>
                  <li>Girar a la derecha en la rotonda principal</li>
                  <li>El predio se encuentra a 200 metros a la izquierda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  )
}

export default HomePage