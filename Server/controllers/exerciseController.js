const Exercise = require('../models/Exercise');
const User = require('../models/User');

// Create a new exercise
exports.createExercise = async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exercises
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific exercise by ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a specific exercise by ID
exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a specific exercise by ID
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get exercises based on user profile
exports.getExercisesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const query = {
      $and: [
        { Goal: user.goal }, // Match Type with user's goals
        // { Level: user.Level }, 
        { Equipment: user.Equipment  } 
      ]
    };

    console.log("Query:", JSON.stringify(query, null, 2));

    const exercises = await Exercise.find(query);

    console.log("Exercises found:", exercises); // Log found exercises

    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
