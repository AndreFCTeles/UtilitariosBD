const fs = require('fs');
const path = require('path');

const oldFolderPath = path.join(__dirname, 'old');
const newFolderPath = path.join(__dirname, 'new');
const oldFilePath = path.join(oldFolderPath, 'tblClientes.json');
const newFilePath = path.join(newFolderPath, 'newTblClientes.json');

fs.readFile(oldFilePath, 'utf8', (err, data) => {
   if (err) {
      console.error("Error reading the file", err);
      return;
   }
   const clientList = JSON.parse(data);

   const newClientList = clientList.map((client, index) => refactorClient(client, index));

   writeJsonFile(newFilePath, newClientList);
});

function refactorClient(client, index) {
   return {
      ID: index.toString(),
      Nome: client.Nome,
      Empresa: null,
      Morada: null,
      Contactos: [{
         Nome: null,
         Tel: null,
         Obs: null,
         Email: null
      }]
   };
}

function writeJsonFile(filePath, data) {
   fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      if (err) console.error(`Error writing to file`, err);
   });
}
