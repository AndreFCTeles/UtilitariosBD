const fs = require('fs');
const path = require('path');

const newFolderPath = path.join(__dirname, 'new');

function writeJsonFile(fileName, data) {
   const newFilePath = path.join(newFolderPath, fileName);
   fs.writeFile(newFilePath, JSON.stringify(data, null, 2), err => {
      if (err) console.error(`Error writing ${fileName}`, err);
   });
}

module.exports = writeJsonFile;