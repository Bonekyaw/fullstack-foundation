import { useState } from "react";
import { Link, NavLink } from "react-router";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-sky-600 p-4 text-white">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">
          Fashion Shop
        </Link>
        <button onClick={toggleMenu} className="block text-xl lg:hidden">
          &#8801;
        </button>
        {/* Desktop view Navigation */}
        <ul className="hidden gap-6 lg:flex">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-yellow-500" : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? "text-yellow-500" : "hover:text-gray-300"
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-yellow-500" : "hover:text-gray-300"
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>
        {/* Mobile View Navigation */}
        <div
          className={`bg-opacity-90 fixed inset-0 z-50 transform bg-sky-600 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <Link to="/" className="text-3xl" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/shop" className="text-3xl" onClick={toggleMenu}>
              Shop
            </Link>
            <Link to="/cart" className="text-3xl" onClick={toggleMenu}>
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
