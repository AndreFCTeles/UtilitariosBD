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

module.exports = quickSort;