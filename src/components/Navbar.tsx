
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
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary shadow-md bg-primary/80 flex-shrink-0 mr-4">
            <img 
              src="/lovable-uploads/471f3dce-a7a5-414b-9ebb-378fbb0901d7.png" 
              alt="Mungai & Njenga" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-serif text-xl font-semibold tracking-tight text-white hidden sm:inline">
            Mungai & Njenga
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-white hover:text-secondary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 text-white"
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
                  className="text-xl font-medium text-white hover:text-secondary transition-colors"
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
