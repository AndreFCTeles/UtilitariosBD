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
      transformItem(item, avarias, extras, clientes, maquinas, tipos, modelosElectrex);
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

function transformItem(item, avarias, extras, clientes, maquinas, tipos, modelosElectrex) {
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
}

function collectValues(item, fieldName, count, map) {
   for (let i = 1; i <= count; i++) {
      const field = `${fieldName}${i}`;
      if (item[field] != null) {
         map.set(item[field], null);
      }
      delete item[field];
   }
}

function collectSingleValue(item, fieldName, map) {
   if (item[fieldName] != null) {
      map.set(item[fieldName], null);
   }
   delete item[fieldName];
}

function quickSort(arr) {
   if (arr.length < 2) return arr;
   let pivot = arr[Math.floor(Math.random() * arr.length)];
   let left = [];
   let right = [];
   let equal = [];

   for (let element of arr) {
      if (element < pivot) left.push(element);
      else if (element > pivot) right.push(element);
      else equal.push(element);
   }

   return [...quickSort(left), ...equal, ...quickSort(right)];
}

function createSortedJson(fileName, map) {
   const sortedValues = quickSort(Array.from(map.keys()));
   let orderedObject = {};

   sortedValues.forEach((value, index) => {
      const key = `${fileName.replace('tbl', '').replace('.json', '')}${index + 1}`;
      orderedObject[key] = value;
   });

   writeJsonFile(fileName, [orderedObject]);
}

function writeJsonFile(fileName, data) {
   const newFilePath = path.join(newFolderPath, fileName);
   fs.writeFile(newFilePath, JSON.stringify(data, null, 2), err => {
      if (err) console.error(`Error writing ${fileName}`, err);
   });
}