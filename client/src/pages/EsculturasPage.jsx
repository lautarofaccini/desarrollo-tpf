
import React from 'react';
import { Link } from 'react-router-dom';
import { esculturas } from './esculturas';

const EsculturaList = () => {
return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8 hc-blue text-white text-center">Esculturas del escultor</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esculturas.map((escultura) => (
            <div key={escultura.id} className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full min-h-[400px]">
                <img src={escultura.imagen} alt={escultura.nombre} className="w-full h-64 object-cover" />
                <div className="p-2 flex-grow">
                    <h2 className="text-xl font-semibold text-white">{escultura.nombre}</h2>
                    <p className="text-gray-400">{escultura.descripcion}</p>
            </div>
            <div className='p-2 mt-auto'>
                    <Link to={`/escultura/${escultura.id}`} className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full text-center">Ver más</Link>
                </div>
        </div>
        ))}
    </div>
    </div>
);
};

export default EsculturaList;