const fs = require('fs');
const path = require('path');

const oldFolderPath = path.join(__dirname, 'old');
const newFolderPath = path.join(__dirname, 'new');

if (!fs.existsSync(newFolderPath)) { fs.mkdirSync(newFolderPath); }

const oldFilePath = path.join(oldFolderPath, 'tblCI.json');
const newFilePath = path.join(newFolderPath, 'tblCI.json');

fs.readFile(oldFilePath, 'utf8', (err, data) => {
   if (err) {
      console.error("Error reading the file", err);
      return;
   }
   let clData = JSON.parse(data);
   let processedCl = processClData(clData);

   writeJsonFile(newFilePath, processedCl);
});

function processClData(clData) {
   const circuitosSet = new Set();

   clData.forEach(item => {
      if (item.Circuito && item.Circuito !== null) {
         circuitosSet.add(item.Circuito);
      }
   });

   // Convert Set back to Array, sort alphabetically, and map to desired structure
   return Array.from(circuitosSet)
      .sort()
      .map(circuito => ({ Circuito: circuito }));
}

function writeJsonFile(fileName, data) {
   fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
      if (err) console.error(`Error writing ${fileName}`, err);
   });
}
