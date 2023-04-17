const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform( ) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if(!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!"); 
  }
  let newArr = [...arr];
  newArr.reduce((total, curr, idx, array) => {
  	switch(curr) {
    	case '--discard-next':
      	array[idx+1] ? array.splice(idx, 2, 0) : array.splice(idx, 1, 0);
      break;
      case '--discard-prev':
      	array[idx-1] ? array.splice(idx-1, 2, 0) : array.splice(idx, 1, 0);
      break;
      case '--double-next':
      	array[idx+1] ? array.splice(idx, 1, array[idx+1]) : array.splice(idx, 1, 0);
      break;
      case '--double-prev':
        array[idx-1] ? array.splice(idx, 1, array[idx-1]) : array.splice(idx, 1, 0);
      break;
    }
    return array
  }, [])
  return newArr.filter(el => el !== 0);
}


module.exports = {
  transform
};
