
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
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              src="/lovable-uploads/43bd0766-8ffe-44de-8095-ccb246e710a0.png" 
              alt="Mungai & Njenga" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Mungai & Njenga
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 text-primary"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden",
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
                  className="text-xl font-medium hover:text-secondary transition-colors"
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
