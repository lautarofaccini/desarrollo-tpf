import EscultorCard from './EscultorCard';

function EscultoresGrid({ escultores }) {
return (
    <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 justify-items-center">
            {escultores.map(escultor => (
            <EscultorCard key={escultor.id_escultor} escultor={escultor} />))}
        </div>
    </div>
);
}

export default EscultoresGrid;

