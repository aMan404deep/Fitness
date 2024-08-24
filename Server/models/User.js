const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
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
  goals: {
    type: [String], 
    enum: ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  fitnessLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  availableEquipment: {
    type: [String], 
    default: []
  },
  workoutPreference: {
    type: String,
    enum: ['Home', 'Gym', 'Outdoor'],
    required: true
  },
  timePerWorkout: {
    type: Number, // in minutes
    required: true
  },
  workoutFrequencyPerWeek: {
    type: Number, // Number of workouts per week
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
