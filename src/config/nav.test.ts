import { navLinks } from './nav';

describe('navLinks configuration', () => {
  test('should be an array', () => {
    expect(Array.isArray(navLinks)).toBe(true);
  });

  test('should not be empty', () => {
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test('each item should have name and href properties of type string', () => {
    navLinks.forEach(link => {
      expect(link).toHaveProperty('name');
      expect(typeof link.name).toBe('string');
      expect(link).toHaveProperty('href');
      expect(typeof link.href).toBe('string');
    });
  });
});
