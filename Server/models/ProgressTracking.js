const mongoose = require('mongoose');

const ProgressTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  measurements: {
    type: Map,
    of: Number 
  },
  progressNotes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProgressTracking', ProgressTrackingSchema);
