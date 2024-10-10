// const WorkoutPlan = require('../models/WorkoutPlan');

// exports.createWorkoutPlan = async (req, res) => {
//   try {
//     const workoutPlan = new WorkoutPlan(req.body);
//     await workoutPlan.save();
//     res.status(201).json(workoutPlan);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.getAllWorkoutPlans = async (req, res) => {
//   try {
//     const workoutPlans = await WorkoutPlan.find().populate('exercises');
//     res.status(200).json(workoutPlans);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getWorkoutPlanById = async (req, res) => {
//   try {
//     const workoutPlan = await WorkoutPlan.findById(req.params.id).populate('exercises');
//     if (!workoutPlan) return res.status(404).json({ error: 'Workout Plan not found' });
//     res.status(200).json(workoutPlan);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateWorkoutPlan = async (req, res) => {
//   try {
//     const workoutPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!workoutPlan) return res.status(404).json({ error: 'Workout Plan not found' });
//     res.status(200).json(workoutPlan);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.deleteWorkoutPlan = async (req, res) => {
//   try {
//     const workoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
//     if (!workoutPlan) return res.status(404).json({ error: 'Workout Plan not found' });
//     res.status(200).json({ message: 'Workout Plan deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const WorkoutPlan = require('../models/WorkoutPlan');
const User = require('../models/User');
const Exercise = require('../models/Exercise');

exports.createWorkoutPlan = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const { timePerWorkout, workoutFrequencyPerWeek } = user;

    // Fetch one exercise that matches user's preferences (customize this query as needed)
    const exercise = await Exercise.findOne({
      // Add filters based on the user's preferences, e.g., equipment, type, level, etc.
    });

    if (!exercise) {
      return res.status(404).json({ error: 'No matching exercise found' });
    }
    // Calculate total months and workout days in the plan
    let totalWeeks = 12; // Assuming a 3-month plan
    if(user.Level === 'beginner'){
      totalWeeks = 24;
    }else if(user.Level === 'intermediate'){
      totalWeeks = 16;
    }else{
      totalWeeks = 12;
    }
    const totalWorkoutDays = workoutFrequencyPerWeek * totalWeeks;
    const totalMonths = totalWeeks / 4; // Total months based on weeks

    // Create workout plan
    const workoutPlan = new WorkoutPlan({
      user: userId,
      exercises: [exercise._id],
      totalDuration: timePerWorkout * workoutFrequencyPerWeek,
      frequencyPerWeek: workoutFrequencyPerWeek,
      totalMonths,
      totalWorkoutDays
    });

    await workoutPlan.save();

    res.status(201).json(workoutPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllWorkoutPlans = async (req, res) => {
  try {
    const workoutPlans = await WorkoutPlan.find().populate('exercises').populate('user');
    res.status(200).json(workoutPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkoutPlanById = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id).populate('exercises').populate('user');
    if (!workoutPlan) return res.status(404).json({ error: 'Workout plan not found' });
    res.status(200).json(workoutPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workoutPlan) return res.status(404).json({ error: 'Workout plan not found' });
    res.status(200).json(workoutPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
    if (!workoutPlan) return res.status(404).json({ error: 'Workout plan not found' });
    res.status(200).json({ message: 'Workout plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
