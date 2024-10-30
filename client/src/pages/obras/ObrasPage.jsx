
import { useEffect } from "react";
import { useObras } from "@/context/ObraContext";
import ObraCard from "@/components/ObraCard";

function ObrasPage() {
  const { obras, loadObras } = useObras();

  useEffect(() => {
    loadObras();
  }, [loadObras]);

  return (
    <div className="bg-neutral-800 flex flex-col justify-between px-20 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-8 hc-blue text-white text-center">
          {" "}
          Obras del escultor{" "}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {obras.map((obra) => (
          <ObraCard obra={obra} key={obra.id_obra} />
        ))}
      </div>
    </div>
  );
}

export default ObrasPage;
