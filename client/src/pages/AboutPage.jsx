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
      "https://storage.googleapis.com/obrasbienal/escultor_1733318746238.webp",
  },
  {
    name: "Facundo Miles Fernández",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733319184180.webp",
  },
  {
    name: "Juan Ignacio Velazco Gez Schegtel",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733318478824.webp",
  },
  {
    name: "Lautaro Faccini",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733318260856.webp",
  },
  {
    name: "Mauricio Nicolás Schefer",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_1733318376103.webp",
  },
  {
    name: "Yamil Apas Moselli",
    image:
      "https://storage.googleapis.com/obrasbienal/escultor_12_1733319058340.webp",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-pink-400 mb-12"
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
