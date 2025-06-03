import db from '../models/index.js';
const { TeamMember } = db; // Destructure for convenience

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.findAll();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ message: 'Failed to fetch team members', error: error.message });
  }
};

// Get a single team member by ID
export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    console.error('Error fetching team member by ID:', error);
    res.status(500).json({ message: 'Failed to fetch team member', error: error.message });
  }
};

// Create a new team member
export const createTeamMember = async (req, res) => {
  try {
    const { name, role, bio, imageUrl } = req.body;
    if (!name || !role || !bio) {
      return res.status(400).json({ message: 'Name, role, and bio are required.' });
    }
    const newMember = await TeamMember.create({ name, role, bio, imageUrl });
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    // Check for Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to create team member', error: error.message });
  }
};

// Update an existing team member
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, bio, imageUrl } = req.body;

    // Basic validation: ensure at least one field is being updated if specific fields are required for update
    // For simplicity, we'll allow partial updates, but if name/role/bio were required, check them.
    // if (!name && !role && !bio && !imageUrl) {
    //   return res.status(400).json({ message: 'No fields provided for update.' });
    // }

    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Update fields
    member.name = name !== undefined ? name : member.name;
    member.role = role !== undefined ? role : member.role;
    member.bio = bio !== undefined ? bio : member.bio;
    member.imageUrl = imageUrl !== undefined ? imageUrl : member.imageUrl;

    await member.save();
    res.status(200).json(member);
  } catch (error) {
    console.error('Error updating team member:', error);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to update team member', error: error.message });
  }
};

// Delete a team member
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    await member.destroy();
    res.status(200).json({ message: 'Team member deleted successfully' });
    // res.status(204).send(); // Or no content
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ message: 'Failed to delete team member', error: error.message });
  }
};
