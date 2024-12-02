import React from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'

function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Seccion de inicio */}
      <section className="relative h-screen">
        <img
          src="/FU-Bienal2024 editado.jpg"
          alt="Fondo Bienal"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
          <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-ligh text-[#6dc5f8] stroke-text underline" >Bienal 2024</h1>
          <p className="text-xl md:text-2xl mr-6 pl-1 stroke-text-sm text-[rgb(255,255,255)]">Una exposición única de arte y escultura contemporánea</p>
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
                src={`/Escultura${index + 1}.jpg`}
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
      <div className="h-[400px] bg-gray-800 rounded-xl relative">
        <a href="https://www.google.com/maps/place/Predio+de+las+Bienales/@-27.4419929,-58.9848968,15.5z/data=!4m6!3m5!1s0x94450c5b052eb443:0x891619c21777887b!8m2!3d-27.4372388!4d-58.9813493!16s%2Fg%2F11c4y0ld7h?hl=es-AR&entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D">
        <img
          src="/mapa2.png"
          alt="Fondo Bienal"
          className="object-cover h-full w-full rounded-2xl"
        />
        </a>
        <a
          href="https://www.google.com/maps/place/Predio+de+las+Bienales/@-27.4419929,-58.9848968,15.5z/data=!4m6!3m5!1s0x94450c5b052eb443:0x891619c21777887b!8m2!3d-27.4372388!4d-58.9813493!16s%2Fg%2F11c4y0ld7h?hl=es-AR&entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
          className="absolute bg-[#99defb] text-white py-4 px-6 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-[#7cc0e6] transition-colors "
          target="_blank"
        >
          Ver en el mapa
        </a>
      </div>
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-white">Cómo Llegar</h2>
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-gray-400">
            <MapPin className="h-5 w-5 text-gray-400" />
            Avenida de los Inmigrantes 1001, Resistencia, Chaco
          </p>
          <div className="space-y-2">
            <h3 className="font-semibold text-xl text-white">Indicaciones:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Desde el centro, tomar Av. 25 De Mayo</li>
              <li>Girar a la derecha en la Av. Wilde</li>
              <li>Seguir derecho hasta el parque 2 de febrero</li>
              <li>El predio se encuentra a la izquierda</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</section>



      {/* Seccion de contacto */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Contacto</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Teléfono</h3>
              <p className="text-gray-300">+54 362 444-5555</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-300">contacto@bienalchaco.com</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Dirección</h3>
              <p className="text-gray-300">Avenida de los Inmigrantes 1001, Resistencia, Chaco</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seccion del grupo (NO se si meter) */}
      <section className="py-16 px-4 md:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="p-0 m-0">
            <h1 className='text-6xl'>Grupo N°5</h1>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Integrantes:</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <ul className="list-disc list-inside space-y-2 pl-5 text-gray-300">
                  <li>Mauri</li>
                  <li>Lauti</li>
                  <li>Negro</li>
                  <li>Ñamil</li>
                  <li>Agustina</li>
                  <li>Cuñado</li>
                  <li>Juani del asco</li>
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