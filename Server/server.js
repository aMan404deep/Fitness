const express = require('express');
const dbConnect = require('./middlewares/Db');

const userController = require('./controllers/userController');
const exerciseController = require('./controllers/exerciseController');
const workoutPlanController = require('./controllers/workoutPlanController');
const nutritionalGuidanceController = require('./controllers/nutritionalGuidanceController');
const progressTrackingController = require('./controllers/progressTrackingController');

const app = express();

dbConnect();

app.use(express.json());

// User routes
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser); // Changed from POST to PUT
app.delete('/users/:id', userController.deleteUser); // Changed from POST to DELETE

// Exercise routes
app.post('/exercises', exerciseController.createExercise);
app.get('/exercises', exerciseController.getAllExercises);
app.get('/exercises/:id', exerciseController.getExerciseById);
app.put('/exercises/:id', exerciseController.updateExercise); // Changed from POST to PUT
app.delete('/exercises/:id', exerciseController.deleteExercise); // Changed from POST to DELETE

// Workout Plan routes
app.post('/workout-plans', workoutPlanController.createWorkoutPlan);
app.get('/workout-plans', workoutPlanController.getAllWorkoutPlans);
app.get('/workout-plans/:id', workoutPlanController.getWorkoutPlanById);
app.put('/workout-plans/:id', workoutPlanController.updateWorkoutPlan); // Changed from POST to PUT
app.delete('/workout-plans/:id', workoutPlanController.deleteWorkoutPlan); // Changed from POST to DELETE

// Nutritional Guidance routes
app.post('/nutritional-guidance', nutritionalGuidanceController.createNutritionalGuidance);
app.get('/nutritional-guidance', nutritionalGuidanceController.getAllNutritionalGuidance);
app.get('/nutritional-guidance/:id', nutritionalGuidanceController.getNutritionalGuidanceById);
app.put('/nutritional-guidance/:id', nutritionalGuidanceController.updateNutritionalGuidance); // Changed from POST to PUT
app.delete('/nutritional-guidance/:id', nutritionalGuidanceController.deleteNutritionalGuidance); // Changed from POST to DELETE

// Progress Tracking routes
app.post('/progress-tracking', progressTrackingController.createProgressTracking);
app.get('/progress-tracking', progressTrackingController.getAllProgressTracking);
app.get('/progress-tracking/:id', progressTrackingController.getProgressTrackingById);
app.put('/progress-tracking/:id', progressTrackingController.updateProgressTracking); // Changed from POST to PUT
app.delete('/progress-tracking/:id', progressTrackingController.deleteProgressTracking); // Changed from POST to DELETE

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
