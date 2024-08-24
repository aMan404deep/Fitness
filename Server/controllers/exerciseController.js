
const Exercise = require('../models/Exercise');

// Create a new exercise
exports.createExercise = async (req, res) => {
  try {
    const { name, category, intensity, duration, description } = req.body;
    
    // Basic validation
    if (!name || !category || !intensity || !duration || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const exercise = new Exercise({
      name,
      category,
      intensity,
      duration,
      description
    });
    
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create exercise: ' + err.message });
  }
};

// Get all exercises
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve exercises: ' + err.message });
  }
};

// Get an exercise by ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve the exercise: ' + err.message });
  }
};

// Update an exercise by ID
exports.updateExercise = async (req, res) => {
  try {
    const { name, category, intensity, duration, description } = req.body;
    const updates = { name, category, intensity, duration, description };

    // Remove empty fields from updates
    Object.keys(updates).forEach(key => updates[key] === undefined || updates[key] === '' ? delete updates[key] : {});

    const exercise = await Exercise.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update the exercise: ' + err.message });
  }
};

// Delete an exercise by ID
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the exercise: ' + err.message });
  }
};
