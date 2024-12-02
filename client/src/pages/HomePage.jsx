import GoogleMapComponent from "@/components/GoogleMapComponent";
import { MapPin, Mail, Phone } from "lucide-react";

function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Seccion de inicio */}
      <section className="relative h-screen">
        <img
          src="/FU-Bienal2024 editado.jpg"
          alt="Fondo Bienal"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
          <div className="max-w-2xl">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-bold -mb-2 ">
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 via-purple-500 to-indigo-500"
                  style={{ WebkitTextStroke: "1.5px black" }}
                >
                  Bienal 2024
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-xl mr-3 font-semibold text-gray-700  p-1 ">
              Una exposición única de arte y escultura contemporánea
            </p>
          </div>
        </div>
      </section>

      {/* Section de fotos de la bienal */}
      <section className="py-16 px-4 md:px-8 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          Nuestras Esculturas
        </h2>
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
            La Bienal del Chaco es un evento internacional de escultura que
            reúne a artistas de todo el mundo. Durante este evento, podrás
            explorar una impresionante colección de obras de artistas
            reconocidos y emergentes.
          </p>
          <p className="text-lg text-gray-300">
            Descubre instalaciones, pinturas, esculturas y más, diseñadas para
            desafiar tus sentidos e inspirar nuevas perspectivas sobre el arte
            contemporáneo.
          </p>
        </div>
      </section>

      {/* Seccion de como llegar */}
      <section className="py-16 px-4 md:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <GoogleMapComponent />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">Cómo Llegar</h2>
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5 text-gray-400" />
                Avenida de los Inmigrantes 1001, Resistencia, Chaco
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-white">
                  Indicaciones:
                </h3>
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
              <p className="text-gray-300">
                Avenida de los Inmigrantes 1001, Resistencia, Chaco
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seccion del grupo (NO se si meter) */}
      <section className="py-16 px-4 md:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="p-0 m-0">
            <h1 className="text-6xl">Grupo N°5</h1>
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
  );
}

export default HomePage;
