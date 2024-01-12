const fs = require('fs');
const path = require('path');

const oldFolderPath = path.join(__dirname, 'old');
const newFolderPath = path.join(__dirname, 'new');
const oldFilePath = path.join(oldFolderPath, 'tblMaquinas.json');
const newFilePath = path.join(newFolderPath, 'tblMaquinas.json');

fs.readFile(oldFilePath, 'utf8', (err, data) => {
   if (err) {
      console.error("Error reading the file", err);
      return;
   }

   const oldMaquinasList = JSON.parse(data);
   const newMaquinasList = transformMaquinas(oldMaquinasList);

   writeJsonFile(newFilePath, newMaquinasList);
});
/*
function transformMaquinas(oldMaquinasList) {
   const MaquinaEntries = Object.entries(oldMaquinasList[0]);
   return MaquinaEntries.map(([key, value]) => ({
      Maquina: value
   }));
}
*/
function transformMaquinas(oldMaquinasList) {
   const maquinaEntries = Object.entries(oldMaquinasList[0]);
   let uniqueMaquinas = new Set();

   maquinaEntries.forEach(([key, value]) => {
      // Remove spaces and convert to upper case
      const transformedValue = value.replace(/\s/g, '').toUpperCase();

      // Add to set to ensure uniqueness
      uniqueMaquinas.add(transformedValue);
   });

   // Convert the set back to an array of objects
   return Array.from(uniqueMaquinas).map(maquina => ({ Maquina: maquina }));
}

function writeJsonFile(filePath, data) {
   fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      if (err) console.error(`Error writing to file`, err);
   });
}
