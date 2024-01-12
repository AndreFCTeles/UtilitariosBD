const fs = require('fs');
const path = require('path');

const collectDynamicValues = require('./utils/collectDynamicValues');
const collectReferences = require('./utils/collectReferences');
const collectSingleValue = require('./utils/collectSingleValue');
const createSortedJSON = require('./utils/createSortedJSON');
const removeOldFields = require('./utils/removeOldFields');
const transformItem = require('./utils/transformItem');
const updateItemWithReferences = require('./utils/updateItemWithReferences');
const writeJsonFile = require('./utils/writeJsonFile');

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
      transformItem(item, avarias, extras, clientes, maquinas, tipos, modelosElectrex, true);
   });

   const avariasMapping = createSortedJSON('tblAvarias.json', avarias);
   const extrasMapping = createSortedJSON('tblExtras.json', extras);
   const clientesMapping = createSortedJSON('tblClientes.json', clientes);
   const maquinasMapping = createSortedJSON('tblMaquinas.json', maquinas);
   const tiposMapping = createSortedJSON('tblTipos.json', tipos);
   const modelosElectrexMapping = createSortedJSON('tblModelosElectrex.json', modelosElectrex);

   repairList.forEach(item => {
      updateItemWithReferences(item, avariasMapping, extrasMapping, clientesMapping, maquinasMapping, tiposMapping, modelosElectrexMapping);
      removeOldFields(item);
   });

   writeJsonFile('tblRepairList.json', repairList);
});
