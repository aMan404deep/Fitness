const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  }],
  schedule: {
    type: [String], 
    required: true
  },
  duration: {
    type: Number, 
    required: true
  }
});

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
