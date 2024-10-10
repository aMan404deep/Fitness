const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    }
  ],
  totalDuration: {
    type: Number, // in minutes
    required: true,
  },
  frequencyPerWeek: {
    type: Number,
    required: true,
  },
  totalMonths: {
    type: Number,
    required: true,
  },
  totalWorkoutDays: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
