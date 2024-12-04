import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  const menuItems = [
    { path: "/obras", label: "Obras" },
    { path: "/escultores", label: "Escultores" },
    { path: "/eventos", label: "Eventos" },
    { path: "/about", label: "Conócenos" },
    ...(isAuthenticated
      ? [{ path: "#", label: "Cerrar Sesión", onClick: handleLogout }]
      : [{ path: "/login", label: "Iniciar Sesión" }]),
  ];

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <NextUINavbar
      className="z-30 bg-gray-800 px-4 py-4"
      isBordered
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarBrand>
        <Link to="/" onClick={handleMenuClose}>
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </NavbarBrand>

      {/* Botón de menú */}
      <NavbarContent className="lg:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        />
      </NavbarContent>

      {/* Contenido visible en pantallas grandes */}
      <NavbarContent className="hidden lg:flex gap-4" justify="end">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              to={item.path}
              className={`text-2xl px-2 py-1 underline ${
                location.pathname === item.path
                  ? "text-[#58c2f0]"
                  : "text-white"
              }`}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault(); // Previene la navegación si hay una acción personalizada
                  item.onClick(e);
                }
                handleMenuClose(); // Cierra el menú
              }}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Menú desplegable */}
      <NavbarMenu className="bg-neutral-900 bg-opacity-90 backdrop-blur-lg mt-8">
        <NavbarMenuItem>
          <Link
            to="/"
            className={`w-full text-lg underline ${
              location.pathname === "/" ? "text-[#58c2f0]" : "text-white"
            }`}
            onClick={handleMenuClose}
          >
            Home
          </Link>
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              to={item.path}
              className={`w-full text-lg underline ${
                location.pathname === item.path
                  ? "text-[#58c2f0]"
                  : "text-white"
              }`}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault(); // Previene la navegación si hay una acción personalizada
                  item.onClick(e);
                }
                handleMenuClose(); // Cierra el menú
              }}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}

export default Navbar;
