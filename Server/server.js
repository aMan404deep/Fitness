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
app.post('/users/:id', userController.updateUser);
app.post('/users/:id', userController.deleteUser);

// Exercise routes
app.post('/exercises', exerciseController.createExercise);
app.get('/exercises', exerciseController.getAllExercises);
app.get('/exercises/:id', exerciseController.getExerciseById);
app.post('/exercises/:id', exerciseController.updateExercise);
app.post('/exercises/:id', exerciseController.deleteExercise);
app.get('/users/:userId/exercises', exerciseController.getExercisesForUser);  // New route

// Workout Plan routes
app.post('/workout-plans', workoutPlanController.createWorkoutPlan);
app.get('/workout-plans', workoutPlanController.getAllWorkoutPlans);
app.get('/workout-plans/:id', workoutPlanController.getWorkoutPlanById);
app.post('/workout-plans/:id', workoutPlanController.updateWorkoutPlan);
app.post('/workout-plans/:id', workoutPlanController.deleteWorkoutPlan);

// Nutritional Guidance routes
app.post('/nutritional-guidance', nutritionalGuidanceController.createNutritionalGuidance);
app.get('/nutritional-guidance', nutritionalGuidanceController.getAllNutritionalGuidance);
app.get('/nutritional-guidance/:id', nutritionalGuidanceController.getNutritionalGuidanceById);
app.post('/nutritional-guidance/:id', nutritionalGuidanceController.updateNutritionalGuidance);
app.post('/nutritional-guidance/:id', nutritionalGuidanceController.deleteNutritionalGuidance);

// Progress Tracking routes
app.post('/progress-tracking', progressTrackingController.createProgressTracking);
app.get('/progress-tracking', progressTrackingController.getAllProgressTracking);
app.get('/progress-tracking/:id', progressTrackingController.getProgressTrackingById);
app.post('/progress-tracking/:id', progressTrackingController.updateProgressTracking);
app.post('/progress-tracking/:id', progressTrackingController.deleteProgressTracking);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
