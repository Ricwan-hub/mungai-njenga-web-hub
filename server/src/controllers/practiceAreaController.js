import db from '../models/index.js';
const { PracticeArea } = db;

// Get all practice areas
export const getAllPracticeAreas = async (req, res) => {
  try {
    const areas = await PracticeArea.findAll();
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error fetching practice areas:', error);
    res.status(500).json({ message: 'Failed to fetch practice areas', error: error.message });
  }
};

// Get a single practice area by ID
export const getPracticeAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await PracticeArea.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: 'Practice area not found' });
    }
    res.status(200).json(area);
  } catch (error) {
    console.error('Error fetching practice area by ID:', error);
    res.status(500).json({ message: 'Failed to fetch practice area', error: error.message });
  }
};

// Create a new practice area
export const createPracticeArea = async (req, res) => {
  try {
    const { icon, title, description } = req.body;
    if (!title || !description) { // Icon can be optional
      return res.status(400).json({ message: 'Title and description are required.' });
    }
    const newArea = await PracticeArea.create({ icon, title, description });
    res.status(201).json(newArea);
  } catch (error) {
    console.error('Error creating practice area:', error);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to create practice area', error: error.message });
  }
};

// Update an existing practice area
export const updatePracticeArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, title, description } = req.body;

    const area = await PracticeArea.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: 'Practice area not found' });
    }

    area.icon = icon !== undefined ? icon : area.icon;
    area.title = title !== undefined ? title : area.title;
    area.description = description !== undefined ? description : area.description;

    await area.save();
    res.status(200).json(area);
  } catch (error) {
    console.error('Error updating practice area:', error);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to update practice area', error: error.message });
  }
};

// Delete a practice area
export const deletePracticeArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await PracticeArea.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: 'Practice area not found' });
    }
    await area.destroy();
    res.status(200).json({ message: 'Practice area deleted successfully' });
  } catch (error) {
    console.error('Error deleting practice area:', error);
    res.status(500).json({ message: 'Failed to delete practice area', error: error.message });
  }
};
