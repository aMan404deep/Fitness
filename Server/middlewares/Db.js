const mongoose = require('mongoose');

const username = 'amandeep101003';
const password = 'aman1001';
const dbName = 'Fitness'; 

const url = `mongodb+srv://${username}:${password}@cluster0.rlqapzu.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const dbConnect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB successfully.');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = dbConnect;
