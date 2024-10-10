// routes/progressTrackingRoutes.js
const express = require('express');
const progressTrackingController = require('../controllers/progressTrackingController');

const router = express.Router();

router.post('/', progressTrackingController.createProgressTracking);
router.get('/', progressTrackingController.getAllProgressTracking);
router.get('/:id', progressTrackingController.getProgressTrackingById);
router.put('/:id', progressTrackingController.updateProgressTracking);   // PUT for update
router.delete('/:id', progressTrackingController.deleteProgressTracking); // DELETE for delete

module.exports = router;
