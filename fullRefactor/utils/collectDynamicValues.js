function collectDynamicValues(item, fieldName, map) {
   Object.keys(item).forEach(key => {
      if (key.startsWith(fieldName) && item[key] != null) {
         const value = item[key];
         if (!map.has(value)) {
            map.set(value, `${fieldName}${map.size + 1}`);
         }
         item[key] = map.get(value);
      }
   });
}

module.exports = collectDynamicValues;