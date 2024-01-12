const collectDynamicValues = require('./utils/collectDynamicValues');
const collectSingleValue = require('./utils/collectSingleValue');

function transformItem(item, avarias, extras, clientes, maquinas, tipos, modelosElectrex) {
   item._id = item._id.$oid;
   item.DataTime = item.DataTime.$date;
   item.Actualizada = item.Actualizada === "Sim";
   item.Acessorios = item.Acessorios === "não" || item.Acessorios === null ? "nenhum" : item.Acessorios;

   collectDynamicValues(item, 'Avaria', avarias);
   collectDynamicValues(item, 'Extra', extras);
   collectSingleValue(item, 'Cliente', clientes);
   collectSingleValue(item, 'Maquina', maquinas);
   collectSingleValue(item, 'Tipo', tipos);
   collectSingleValue(item, 'ModeloElectrex', modelosElectrex);
}

module.exports = transformItem;