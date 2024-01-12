function collectReferences(item, fieldName) {
   let references = [];
   Object.keys(item).forEach(key => {
      if (key.startsWith(fieldName) && item[key] != null) {
         references.push(item[key]);
      }
   });
   return references.length > 0 ? references : null;
}

module.exports = collectReferences;