import db from '../models/index.js';
const { Testimonial } = db;

// Get all testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
};

// Get a single testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial by ID:', error);
    res.status(500).json({ message: 'Failed to fetch testimonial', error: error.message });
  }
};

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { quote, author, authorTitle } = req.body;
    if (!quote || !author) { // authorTitle can be optional
      return res.status(400).json({ message: 'Quote and author are required.' });
    }
    const newTestimonial = await Testimonial.create({ quote, author, authorTitle });
    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to create testimonial', error: error.message });
  }
};

// Update an existing testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { quote, author, authorTitle } = req.body;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.quote = quote !== undefined ? quote : testimonial.quote;
    testimonial.author = author !== undefined ? author : testimonial.author;
    testimonial.authorTitle = authorTitle !== undefined ? authorTitle : testimonial.authorTitle;

    await testimonial.save();
    res.status(200).json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to update testimonial', error: error.message });
  }
};

// Delete a testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    await testimonial.destroy();
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Failed to delete testimonial', error: error.message });
  }
};
