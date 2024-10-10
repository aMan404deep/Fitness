const axios = require('axios');

const API_KEY = 'c91cb974e4mshfa7ecebbbcceff3p17ffc2jsn3ae9396974c5'; 

const fetchExercises = async () => {
  try {
    const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
      headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error.message);
    return [];
  }
};

module.exports = fetchExercises;
