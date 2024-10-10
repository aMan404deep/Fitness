const fs = require('fs');
const csv = require('csv-parser');

const results = [];
fs.createReadStream('./scripts/megaGymDataset.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('exercises.json', JSON.stringify(results, null, 2));
    console.log('CSV to JSON conversion completed.');
  });
