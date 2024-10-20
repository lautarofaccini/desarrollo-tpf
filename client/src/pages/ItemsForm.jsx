import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const ItemFormPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement create/edit logic here
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">
          {id ? "Edit Item" : "Create New Item"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-surface p-6 rounded-lg shadow-lg max-w-md"
        >
          <Input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Item Name"
          />
          <Button type="submit" variant="primary" size="lg" className="w-full">
            {id ? "Update Item" : "Create Item"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ItemFormPage;
