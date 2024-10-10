const ProgressTracking = require('../models/ProgressTracking');

exports.createProgressTracking = async (req, res) => {
  try {
    const progressTracking = new ProgressTracking(req.body);
    await progressTracking.save();
    res.status(201).json(progressTracking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProgressTracking = async (req, res) => {
  try {
    const progressTrackingRecords = await ProgressTracking.find();
    res.status(200).json(progressTrackingRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProgressTrackingById = async (req, res) => {
  try {
    const progressTracking = await ProgressTracking.findById(req.params.id);
    if (!progressTracking) return res.status(404).json({ error: 'Progress Tracking not found' });
    res.status(200).json(progressTracking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProgressTracking = async (req, res) => {
  try {
    const progressTracking = await ProgressTracking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!progressTracking) return res.status(404).json({ error: 'Progress Tracking not found' });
    res.status(200).json(progressTracking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProgressTracking = async (req, res) => {
  try {
    const progressTracking = await ProgressTracking.findByIdAndDelete(req.params.id);
    if (!progressTracking) return res.status(404).json({ error: 'Progress Tracking not found' });
    res.status(200).json({ message: 'Progress Tracking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
