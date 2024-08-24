const mongoose = require('mongoose');

const NutritionalGuidanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dietPlan: {
    type: String, 
    required: true
  },
  dailyCalories: {
    type: Number,
    required: true
  },
  mealFrequency: {
    type: Number, 
    required: true
  },
  dietaryRestrictions: {
    type: [String] 
  }
});

module.exports = mongoose.model('NutritionalGuidance', NutritionalGuidanceSchema);
