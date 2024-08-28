const mongoose = require('mongoose');

const NutritionGuidanceSchema = new mongoose.Schema({
  food_items: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  Type: {
    type: String, 
    required: true
  }
}, { collection: 'nutritionalguidances' });

module.exports = mongoose.model('NutritionGuidance', NutritionGuidanceSchema);
