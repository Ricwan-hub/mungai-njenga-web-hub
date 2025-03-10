
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 rounded-full bg-white/10 p-1 border-2 border-secondary shadow-md">
            <img 
              src="/lovable-uploads/43bd0766-8ffe-44de-8095-ccb246e710a0.png" 
              alt="Mungai & Njenga" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">Mungai & Njenga</h3>
            <p className="text-white/70 mb-6">
              Providing exceptional legal counsel with integrity, expertise, and personalized attention.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-secondary transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-secondary transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-secondary transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-white/70 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/#practice-areas" className="text-white/70 hover:text-secondary transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link to="/#team" className="text-white/70 hover:text-secondary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-white/70 hover:text-secondary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-white/70 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-medium mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Corporate Law
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Contract Law
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Real Estate
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Family Law
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Litigation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-secondary transition-colors">
                  Intellectual Property
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-6">Contact Us</h4>
            <address className="not-italic text-white/70 space-y-3">
              <p>
                12th Floor, Landmark Plaza<br />
                Nairobi, Kenya
              </p>
              <p>Phone: +254 XXX XXX XXX</p>
              <p>Email: info@mungainjenga.com</p>
            </address>
          </div>
        </div>

        <Separator className="bg-white/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <p>© {currentYear} Mungai & Njenga Advocates. All rights reserved.</p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
