function EstadoBottons({ estado, onChangeState, loading }) {
  return (
    <div className="mt-4 flex gap-2">
      {estado === "activo" && (
        <>
          <button
            onClick={() => onChangeState("pausar")}
            disabled={loading} // Deshabilitar si está cargando
            className={`px-4 py-2 rounded-md text-white bg-yellow-500 ${
              loading ? "cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
          >
            Pausar
          </button>
          <button
            onClick={() => onChangeState("finalizar")}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white bg-red-600 ${
              loading ? "cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            Finalizar
          </button>
          <button
            onClick={() => onChangeState("desactivar")}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white bg-gray-600  ${
              loading ? "cursor-not-allowed" : "hover:bg-gray-700"
            }`}
          >
            Desactivar
          </button>
        </>
      )}
      {estado === "pausado" && (
        <>
          <button
            onClick={() => onChangeState("activar")}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white bg-green-500 ${
              loading ? "cursor-not-allowed" : "hover:bg-green-600"
            }`}
          >
            Reanudar
          </button>
          <button
            onClick={() => onChangeState("finalizar")}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white bg-red-600 ${
              loading ? "cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            Finalizar
          </button>
          <button
            onClick={() => onChangeState("desactivar")}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white bg-gray-600 ${
              loading ? "cursor-not-allowed" : "hover:bg-gray-700"
            }`}
          >
            Desactivar
          </button>
        </>
      )}
      {estado === "inactivo" && (
        <button
          onClick={() => onChangeState("activar")}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white bg-green-500 ${
            loading ? "cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          Activar
        </button>
      )}
      {estado === "finalizado" && (
        <button
          onClick={() => onChangeState("desactivar")}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white bg-gray-600 ${
            loading ? "cursor-not-allowed" : "hover:bg-gray-700"
          }`}
        >
          Reiniciar
        </button>
      )}
    </div>
  );
}

export default EstadoBottons;
