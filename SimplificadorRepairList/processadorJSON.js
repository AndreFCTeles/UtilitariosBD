const fs = require('fs');
const path = require('path');

const oldFolderPath = path.join(__dirname, 'old');
const newFolderPath = path.join(__dirname, 'new');

if (!fs.existsSync(newFolderPath)) {
   fs.mkdirSync(newFolderPath);
}

const oldFilePath = path.join(oldFolderPath, 'tblRepairList.json');

function aggregateFields(item, fieldName, count) {
   let fieldArray = [];
   for (let i = 1; i <= count; i++) {
      const fieldKey = `${fieldName}${i}`;
      if (item[fieldKey]) {
         fieldArray.push(item[fieldKey]);
      }
      delete item[fieldKey];
   }
   return fieldArray.length > 0 ? fieldArray : null;
}

fs.readFile(oldFilePath, 'utf8', (err, data) => {
   if (err) {
      console.error("Error reading the file", err);
      return;
   }
   const repairList = JSON.parse(data);

   const updatedRepairList = repairList.map(item => {
      // Refactor "$oid" and "$date"
      item._id = item._id.$oid;
      item.DataTime = item.DataTime.$date;

      // Join "Avaria" fields into "Avarias"
      item.Avarias = aggregateFields(item, 'Avaria', 30);

      // Join "Extra" fields into "Extras"
      item.Extras = aggregateFields(item, 'Extra', 3);

      // Delete fields not needed
      ['ModeloCheck', 'Link', 'LinkCheck', 'ID'].forEach(field => delete item[field]);

      return item;
   });

   writeJsonFile('tblRepairList.json', updatedRepairList);
});

function writeJsonFile(fileName, data) {
   const newFilePath = path.join(newFolderPath, fileName);
   fs.writeFile(newFilePath, JSON.stringify(data, null, 2), err => {
      if (err) console.error(`Error writing ${fileName}`, err);
   });
}
