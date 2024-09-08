const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  bodyPart: {
    type: String,
    required: true
  },
  intensity: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  Level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  Desc: {
    type: String,
    required: true
  },
  Equipment: {
    type: String, // e.g., ['Dumbbells', 'Resistance Bands']
    required: true
  },
  Type: {
    type: String, // e.g., ['Weight Loss', 'Muscle Gain']
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
