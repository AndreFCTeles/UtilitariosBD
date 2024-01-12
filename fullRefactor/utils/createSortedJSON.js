const writeJsonFile = require('./writeJsonFile');
const quickSort = require('./quickSort')

function createSortedJson(fileName, map) {
   const sortedValues = quickSort(Array.from(map.keys()));
   let orderedObject = {};
   let valueToKeyMap = new Map();

   sortedValues.forEach((value, index) => {
      const key = `${fileName.replace('tbl', '').replace('.json', '')}${index + 1}`;
      orderedObject[key] = value;
      valueToKeyMap.set(value, key);
   });

   writeJsonFile(fileName, [orderedObject]);
   return valueToKeyMap;
}

module.exports = createSortedJson;