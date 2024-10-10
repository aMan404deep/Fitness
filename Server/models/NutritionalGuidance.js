const mongoose = require('mongoose');

const NutritionGuidanceSchema = new mongoose.Schema({
  breakfast: {
    type: String,
    required: true
  },
  lunch: {
    type: String,
    required: true
  },
  dinner: {
    type: String,
    required: true
  },
  breakfast_recipe: {
    type: String,
    required: true
  },
  lunch_recipe: {
    type: String,
    required: true
  },
  dinner_recipe: {
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
