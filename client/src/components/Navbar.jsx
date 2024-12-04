import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: "/obras", label: "Obras" },
    { path: "/escultores", label: "Escultores" },
    { path: "/eventos", label: "Eventos" },
    { path: "/about", label: "Conocenos" },
    ...(isAuthenticated
      ? [{ path: "/", label: "Cerrar Sesión", onClick: logout }]
      : [{ path: "/login", label: "Iniciar Sesión" }]),
  ];

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
        <Link to="/">
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
              onClick={item.onClick}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Menú desplegable */}
      <NavbarMenu className="bg-neutral-900 bg-opacity-90 backdrop-blur-lg mt-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              to={item.path}
              className={`w-full text-lg underline ${
                location.pathname === item.path
                  ? "text-[#58c2f0]"
                  : "text-white"
              }`}
              onClick={item.onClick}
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
