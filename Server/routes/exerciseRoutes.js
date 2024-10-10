const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Routes
router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.put('/:id', exerciseController.updateExercise); // Use PUT for updates
router.delete('/:id', exerciseController.deleteExercise);
router.get('/fetch', exerciseController.fetchAndSaveExercises); // Route to fetch from API

module.exports = router;
