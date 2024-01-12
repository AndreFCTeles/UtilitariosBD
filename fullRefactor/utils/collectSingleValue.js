function collectSingleValue(item, fieldName, map) {
   if (item[fieldName] != null) {
      const value = item[fieldName];
      if (!map.has(value)) {
         map.set(value, `${fieldName}${map.size + 1}`);
      }
      item[fieldName] = map.get(value);
   }
}

module.exports = collectSingleValue;