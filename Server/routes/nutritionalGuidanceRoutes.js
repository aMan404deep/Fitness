// routes/nutritionalGuidanceRoutes.js
const express = require('express');
const nutritionalGuidanceController = require('../controllers/nutritionalGuidanceController');

const router = express.Router();

router.post('/', nutritionalGuidanceController.createNutritionalGuidance);
router.get('/', nutritionalGuidanceController.getAllNutritionalGuidance);
router.get('/:id', nutritionalGuidanceController.getNutritionalGuidanceById);
router.put('/:id', nutritionalGuidanceController.updateNutritionalGuidance);   // PUT for update
router.delete('/:id', nutritionalGuidanceController.deleteNutritionalGuidance); // DELETE for delete

module.exports = router;
