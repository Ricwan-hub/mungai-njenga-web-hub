import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar from './Navbar';
import { navLinks } from '@/config/nav'; // Using actual navLinks for checking items
// Note: `within` was already added in the previous step's diff, but if it were missing, this is where it would be added.
// For this specific error, it's more about how it's used or if a re-read of the file is needed by the agent.
// Assuming the import is correct as per prior diff. The issue might be how desktopNav is identified.

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and retain default behavior
  Link: jest.fn(({ children, to }) => <a href={to}>{children}</a>),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false, // Default to desktop
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Navbar component', () => {
  test('renders the brand name/logo', () => {
    render(<Navbar />);
    // Check for the text part of the logo
    expect(screen.getByText('Mungai & Njenga')).toBeInTheDocument();
    // Check for the image alt text
    expect(screen.getByAltText('Mungai & Njenga')).toBeInTheDocument();
  });

  test('renders all navigation links from navLinks config', () => {
    render(<Navbar />);
    // Desktop navigation is expected to be visible by default due to window.matchMedia mock

    // Filter for the correct desktop nav if multiple navs exist
    const allNavs = screen.getAllByRole('navigation', {hidden: true});
    const desktopNavActual = Array.from(allNavs).find(nav => nav.classList.contains('lg:flex'));

    expect(desktopNavActual).toBeInTheDocument(); // Ensure we found the desktop nav
    expect(desktopNavActual).toBeVisible(); // And it should be visible in desktop view

    if (desktopNavActual) {
      navLinks.forEach(link => {
        expect(within(desktopNavActual).getByText(link.name, { selector: 'a' })).toBeInTheDocument();
        expect(within(desktopNavActual).getByText(link.name, { selector: 'a' })).toHaveAttribute('href', link.href);
      });
    }
  });

  describe('Mobile menu functionality', () => {
    beforeEach(() => {
      // Ensure mobile view for these tests
      window.matchMedia = jest.fn().mockImplementation(query => ({
        // Tailwind's lg breakpoint is 1024px. It applies to screen widths *min-width: 1024px*.
        // So, for mobile, it should be less than 1024px.
        matches: true, // Simpler: just assume mobile for these tests
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
    });

    test('menu is initially closed on mobile', () => {
      render(<Navbar />);
      const menuButton = screen.getByLabelText('Toggle Menu');
      // Hamburger icon should be visible
      expect(menuButton.querySelector('.lucide-menu')).toBeInTheDocument();
      expect(menuButton.querySelector('.lucide-x')).not.toBeInTheDocument();

      // Mobile nav container logic from component:
      // className={cn("fixed inset-0 bg-primary/95 backdrop-blur-md transition-all duration-300 lg:hidden",
      //  {"opacity-100 pointer-events-auto": isOpen, "opacity-0 pointer-events-none": !isOpen,})}
      // Find the mobile nav menu. It's the div with class "lg:hidden" and "fixed inset-0"
      const mobileNavDiv = document.querySelector('div.lg\\:hidden.fixed.inset-0');
      expect(mobileNavDiv).toHaveClass('opacity-0', 'pointer-events-none');
      expect(mobileNavDiv).not.toHaveClass('opacity-100', 'pointer-events-auto');
    });

    test('clicking menu button opens the mobile menu', () => {
      render(<Navbar />);
      const menuButton = screen.getByLabelText('Toggle Menu');
      fireEvent.click(menuButton);

      // X icon should be visible
      expect(menuButton.querySelector('.lucide-x')).toBeInTheDocument();
      expect(menuButton.querySelector('.lucide-menu')).not.toBeInTheDocument();

      // Mobile nav container should be visible
      const mobileNavDiv = document.querySelector('div.lg\\:hidden.fixed.inset-0');
      expect(mobileNavDiv).toHaveClass('opacity-100', 'pointer-events-auto');
      expect(mobileNavDiv).not.toHaveClass('opacity-0', 'pointer-events-none');

      // Check if links are now accessible within the opened menu
      if (mobileNavDiv) {
        navLinks.forEach(link => {
          expect(within(mobileNavDiv).getByText(link.name, { selector: 'a' })).toBeVisible();
        });
      } else {
        throw new Error("Mobile nav div not found for checking links");
      }
    });

    test('clicking close button (or menu button again) closes the mobile menu', () => {
      render(<Navbar />);
      const menuButton = screen.getByLabelText('Toggle Menu');

      // Open menu
      fireEvent.click(menuButton);
      expect(menuButton.querySelector('.lucide-x')).toBeInTheDocument();

      // Close menu by clicking again
      fireEvent.click(menuButton);
      expect(menuButton.querySelector('.lucide-menu')).toBeInTheDocument();
      expect(menuButton.querySelector('.lucide-x')).not.toBeInTheDocument();

      // Mobile nav container should be hidden again
      const mobileNavDiv = document.querySelector('div.lg\\:hidden.fixed.inset-0');
      expect(mobileNavDiv).toHaveClass('opacity-0', 'pointer-events-none');
      expect(mobileNavDiv).not.toHaveClass('opacity-100', 'pointer-events-auto');
    });
  });

  // Test for scroll behavior (scrolled class)
  test('navbar background changes on scroll', () => {
    render(<Navbar />);
    const header = screen.getByRole('banner'); // The header element

    // Initially, no specific background class related to scroll (bg-transparent)
    expect(header.className).toMatch(/bg-transparent/);
    expect(header.className).not.toMatch(/glass/);

    // Simulate scroll down
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(header.className).toMatch(/glass/);
    expect(header.className).not.toMatch(/bg-transparent/);

    // Simulate scroll back to top
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(header.className).toMatch(/bg-transparent/);
    expect(header.className).not.toMatch(/glass/);
  });
});
