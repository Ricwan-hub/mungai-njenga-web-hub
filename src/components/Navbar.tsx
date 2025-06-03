
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Practice Areas", href: "/#practice-areas" },
    { name: "Our Team", href: "/#team" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        {
          "bg-transparent": !scrolled && !isOpen,
          "glass py-3": scrolled || isOpen,
        }
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center z-50"
          onClick={closeMenu}
        >
          <div className="w-8 h-8 flex items-center justify-center mr-3">
            <img 
              src="/lovable-uploads/61a7f345-f09a-49ac-92fa-87f2f93aa59c.png" 
              alt="Mungai & Njenga" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <span className="font-serif text-xl font-semibold tracking-tight text-white">
            Mungai & Njenga
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 text-white transition-colors duration-300"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-primary/95 backdrop-blur-md transition-all duration-300 lg:hidden",
            {
              "opacity-100 pointer-events-auto": isOpen,
              "opacity-0 pointer-events-none": !isOpen,
            }
          )}
        >
          <div className="flex items-center justify-center h-full">
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xl font-medium text-white transition-colors duration-300"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
