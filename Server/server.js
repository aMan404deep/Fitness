const express = require('express');
const dbConnect = require('./middlewares/Db'); 

const userController = require('./controllers/userController');
const exerciseController = require('./controllers/exerciseController');
const workoutPlanController = require('./controllers/workoutPlanController');
const nutritionalGuidanceController = require('./controllers/nutritionalGuidanceController');
const progressTrackingController = require('./controllers/progressTrackingController');

const app = express();
const cors = require('cors');

// Use CORS middleware
app.use(cors());

dbConnect();

app.use(express.json());

app.post('/api/login', userController.login);
// User routes
app.post('/api/users', userController.createUser);
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUserById);
app.post('/api/users/:id', userController.updateUser);
app.post('/api/delete/users/:id', userController.deleteUser);

// Exercise routes
app.post('/api/exercises', exerciseController.createExercise);
app.get('/api/exercises', exerciseController.getAllExercises);
app.get('/api/exercises/:id', exerciseController.getExerciseById);
app.post('/api/exercises/:id', exerciseController.updateExercise);
app.post('/api/exercises/:id', exerciseController.deleteExercise);
app.get('/api/users/:userId/exercises', exerciseController.getExercisesForUser);  // New route

// Workout Plan routes
app.post('/api/workout-plans', workoutPlanController.createWorkoutPlan);
app.get('/api/workout-plans', workoutPlanController.getAllWorkoutPlans);
app.get('/api/workout-plans/:id', workoutPlanController.getWorkoutPlanById);
app.post('/api/workout-plans/:id', workoutPlanController.updateWorkoutPlan);
app.post('/api/workout-plans/:id', workoutPlanController.deleteWorkoutPlan);

// Nutritional Guidance routes
app.post('/api/nutritional-guidance', nutritionalGuidanceController.createNutritionalGuidance);
app.get('/api/nutritional-guidance', nutritionalGuidanceController.getAllNutritionalGuidance);
app.get('/api/nutritional-guidance/:id', nutritionalGuidanceController.getNutritionalGuidanceById);
app.post('/api/nutritional-guidance/:id', nutritionalGuidanceController.updateNutritionalGuidance);
app.post('/api/nutritional-guidance/:id', nutritionalGuidanceController.deleteNutritionalGuidance);
app.get('/api/users/:userId/nutrition', nutritionalGuidanceController.getNutritionForUser); 

// Progress Tracking routes
app.post('/api/progress-tracking', progressTrackingController.createProgressTracking);
app.get('/api/progress-tracking', progressTrackingController.getAllProgressTracking);
app.get('/api/progress-tracking/:id', progressTrackingController.getProgressTrackingById);
app.post('/api/progress-tracking/:id', progressTrackingController.updateProgressTracking);
app.post('/api/progress-tracking/:id', progressTrackingController.deleteProgressTracking);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
