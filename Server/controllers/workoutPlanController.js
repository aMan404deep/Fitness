const WorkoutPlan = require('../models/WorkoutPlan');

exports.createWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = new WorkoutPlan(req.body);
    await workoutPlan.save();
    res.status(201).json(workoutPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllWorkoutPlans = async (req, res) => {
  try {
    const workoutPlans = await WorkoutPlan.find().populate('exercises');
    res.status(200).json(workoutPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkoutPlanById = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id).populate('exercises');
    if (!workoutPlan) return res.status(404).json({ error: 'Workout Plan not found' });
    res.status(200).json(workoutPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workoutPlan) return res.status(404).json({ error: 'Workout Plan not found' });
    res.status(200).json(workoutPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
    if (!workoutPlan) return res.status(404).json({ error: 'Workout Plan not found' });
    res.status(200).json({ message: 'Workout Plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
