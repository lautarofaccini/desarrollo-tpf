import { Link } from "react-router-dom";
import Button from "../components/Button";

const ItemsListPage = () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Items List</h1>
        <Link to="/items/new">
          <Button variant="secondary" size="md" className="mb-4">
            Create New Item
          </Button>
        </Link>
        <ul className="bg-surface rounded-lg shadow-lg overflow-hidden">
          {items.map((item) => (
            <li
              key={item.id}
              className="border-b border-gray-700 last:border-b-0"
            >
              <div className="flex items-center justify-between p-4">
                <span className="text-lg">{item.name}</span>
                <div className="space-x-2">
                  <Link to={`/items/${item.id}/edit`}>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="accent" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemsListPage;
