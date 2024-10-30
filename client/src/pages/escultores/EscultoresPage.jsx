import { useEffect } from "react";
import { useEscultores } from "@/context/EscultorContext";
import EscultorCard from "@/components/EscultorCard";


function EscultoresPage() {
  const { escultores, loadEscultores } = useEscultores();

  useEffect(() => {
    loadEscultores();
  }, [loadEscultores]);

  return (
    <div className="bg-neutral-800 flex flex-col justify-between px-20 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8 hc-blue text-white text-center">
          {" "}
          Escultores del escultor{" "}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {escultores.map((escultor) => (
          <EscultorCard escultor={escultor} key={escultor.id_escultor} />
        ))}
      </div>
    </div>
  )
}

export default EscultoresPage