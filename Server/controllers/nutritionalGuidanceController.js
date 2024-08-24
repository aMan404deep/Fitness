const NutritionalGuidance = require('../models/NutritionalGuidance');

exports.createNutritionalGuidance = async (req, res) => {
  try {
    const nutritionalGuidance = new NutritionalGuidance(req.body);
    await nutritionalGuidance.save();
    res.status(201).json(nutritionalGuidance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllNutritionalGuidance = async (req, res) => {
  try {
    const nutritionalGuidance = await NutritionalGuidance.find();
    res.status(200).json(nutritionalGuidance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNutritionalGuidanceById = async (req, res) => {
  try {
    const nutritionalGuidance = await NutritionalGuidance.findById(req.params.id);
    if (!nutritionalGuidance) return res.status(404).json({ error: 'Nutritional Guidance not found' });
    res.status(200).json(nutritionalGuidance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNutritionalGuidance = async (req, res) => {
  try {
    const nutritionalGuidance = await NutritionalGuidance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nutritionalGuidance) return res.status(404).json({ error: 'Nutritional Guidance not found' });
    res.status(200).json(nutritionalGuidance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteNutritionalGuidance = async (req, res) => {
  try {
    const nutritionalGuidance = await NutritionalGuidance.findByIdAndDelete(req.params.id);
    if (!nutritionalGuidance) return res.status(404).json({ error: 'Nutritional Guidance not found' });
    res.status(200).json({ message: 'Nutritional Guidance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
