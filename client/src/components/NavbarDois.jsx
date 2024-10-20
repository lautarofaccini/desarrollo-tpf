import { Link } from "react-router-dom";

const NavbarDos = () => {
  return (
    <nav className="bg-surface text-text p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Logo
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/items" className="hover:text-primary transition-colors">
              Items
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-primary transition-colors">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarDos;
