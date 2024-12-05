import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Agustín Juan Luis Arduña Zago",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733318588341.webp",
  },
  {
    name: "Fabricio Víctor Kinweiler",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733424078729.webp",
  },
  {
    name: "Facundo Fernández",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733424531501.webp",
  },
  {
    name: "Juan Ignacio Velazco Gez Schegtel",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733423521931.webp",
  },
  {
    name: "Lautaro Faccini",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733423714334.webp",
  },
  {
    name: "Mauricio Nicolás Schefer",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733318376103.webp",
  },
  {
    name: "Yamil Apas Moselli",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733424065208.webp",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-500 to-indigo-300 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center text-black underline mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nuestro Equipo
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center text-purple-300">
                  {member.name}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
