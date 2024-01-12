const collectReferences = require('./utils/collectReferences');

function updateItemWithReferences(item, avariasMapping, extrasMapping, clientesMapping, maquinasMapping, tiposMapping, modelosElectrexMapping) {
   item.Avarias = collectReferences(item, 'Avaria', avariasMapping);
   item.Extras = collectReferences(item, 'Extra', extrasMapping);
   if (item.Cliente && clientesMapping.has(item.Cliente)) {
      item.Cliente = clientesMapping.get(item.Cliente);
   }
   if (item.Maquina && maquinasMapping.has(item.Maquina)) {
      item.Maquina = maquinasMapping.get(item.Maquina);
   }
   if (item.Tipo && tiposMapping.has(item.Tipo)) {
      item.Tipo = tiposMapping.get(item.Tipo);
   }
   if (item.ModeloElectrex && modelosElectrexMapping.has(item.ModeloElectrex)) {
      item.ModeloElectrex = modelosElectrexMapping.get(item.ModeloElectrex);
   }
}

module.exports = updateItemWithReferences;