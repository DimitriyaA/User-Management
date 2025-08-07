const userService = require('../services/firestoreService');

exports.createUser = async (req, res) => {
  const user = req.body;
  console.log('Incoming user data:', user); // Log incoming user data for debugging

  try {
    const newUser = await userService.createUser(user);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err); // Log error on server side
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const { sortBy, search, page = 1, limit = 10 } = req.query;

  try {
    const users = await userService.getAllUsers({ sortBy, search, page, limit });
    res.json(users);
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedUser = await userService.updateUser(id, data);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const success = await userService.deleteUser(req.params.id);
    if (!success) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
};
