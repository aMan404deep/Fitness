const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    type: Number
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  Type: {
    type: String 
  },
  goals:{
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  Level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  Equipment: {
    type: String
  },
  workoutPreference: {
    type: String,
    enum: ['Home', 'Gym', 'Outdoor']
  },
  timePerWorkout: {
    type: String // in minutes
  },
  workoutFrequencyPerWeek: {
    type: Number // Number of workouts per week
  }
});

// Hash password before saving user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
