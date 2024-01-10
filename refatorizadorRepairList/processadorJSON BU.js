const fs = require('fs');
const path = require('path');

const oldFolderPath = path.join(__dirname, 'old');
const newFolderPath = path.join(__dirname, 'new');

if (!fs.existsSync(newFolderPath)) {
   fs.mkdirSync(newFolderPath);
}

const oldFilePath = path.join(oldFolderPath, 'tblRepairList.json');
fs.readFile(oldFilePath, 'utf8', (err, data) => {
   if (err) {
      console.error("Error reading the file", err);
      return;
   }
   const repairList = JSON.parse(data);

   const avarias = new Map();
   const extras = new Map();
   const clientes = new Map();
   const maquinas = new Map();
   const tipos = new Map();
   const modelosElectrex = new Map();

   repairList.forEach(item => {
      item._id = item._id.$oid;
      item.DataTime = item.DataTime.$date;
      item.Atualizada = item.Atualizada === "Sim";
      item.Acessorios = item.Acessorios === "não" || item.Acessorios === null ? "nenhum" : item.Acessorios;

      collectValues(item, 'Avaria', 30, avarias);
      collectValues(item, 'Extra', 3, extras);
      collectSingleValue(item, 'Cliente', clientes);
      collectSingleValue(item, 'Maquina', maquinas);
      collectSingleValue(item, 'Tipo', tipos);
      collectSingleValue(item, 'ModeloElectrex', modelosElectrex);

      ['ModeloCheck', 'Link', 'LinkCheck'].forEach(field => delete item[field]);
   });

   createSortedJson('tblAvarias.json', avarias);
   createSortedJson('tblExtras.json', extras);
   createSortedJson('tblClientes.json', clientes);
   createSortedJson('tblMaquinas.json', maquinas);
   createSortedJson('tblTipos.json', tipos);
   createSortedJson('tblModelosElectrex.json', modelosElectrex);
   writeJsonFile('tblRepairList.json', repairList);
});

function collectValues(item, fieldName, count, map) {
   for (let i = 1; i <= count; i++) {
      const field = `${fieldName}${i}`;
      if (item[field] != null) {
         map.set(item[field], null); // Collect value without assigning a key yet
      }
      delete item[field];
   }
}

function collectSingleValue(item, fieldName, map) {
   if (item[fieldName] != null) {
      map.set(item[fieldName], null);
      delete item[fieldName];
   }
}

function createSortedJson(fileName, map) {
   const sortedValues = Array.from(map.keys()).sort();
   sortedValues.forEach((value, index) => {
      map.set(value, `${fileName.replace('tbl', '').replace('.json', '')}${index + 1}`);
   });

   const orderedObjects = Array.from(map).map(([value, key]) => ({ [key]: value }));
   writeJsonFile(fileName, orderedObjects);
}

function writeJsonFile(fileName, data) {
   const newFilePath = path.join(newFolderPath, fileName);
   fs.writeFile(newFilePath, JSON.stringify(data, null, 2), err => {
      if (err) console.error(`Error writing ${fileName}`, err);
   });
}
