// routes/workoutPlanRoutes.js
const express = require('express');
const workoutPlanController = require('../controllers/workoutPlanController');

const router = express.Router();

router.post('/', workoutPlanController.createWorkoutPlan);
router.get('/', workoutPlanController.getAllWorkoutPlans);
router.get('/:id', workoutPlanController.getWorkoutPlanById);
router.put('/:id', workoutPlanController.updateWorkoutPlan);   // PUT for update
router.delete('/:id', workoutPlanController.deleteWorkoutPlan); // DELETE for delete

module.exports = router;
