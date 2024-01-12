function removeOldAvariaExtraFields(item) {
   for (let i = 1; i <= 30; i++) {
      delete item[`Avaria${i}`];
      delete item[`Extra${i}`];
   }
}

module.exports = removeOldAvariaExtraFields;