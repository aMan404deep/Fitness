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
  Type: {
    type: String, 
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  Level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  Equipment: {
    type: String, 
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
