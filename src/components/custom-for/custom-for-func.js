/* старый вариант */
function customForRecursive(index, condition, array, result) {
  if (condition(index)) {
    if (array[index] % 2 !== 0) {
      if (index === 0 && array[index + 1] % 2 === 0) {
        result[index] = array[index + 1];
      }
      if (index === 0 && array[index + 1] % 2 !== 0) {
        result[index] = 0;
      }
      if (index === array.length - 1 && array[index - 1] % 2 === 0) {
        result[index] = array[index - 1];
        return result;
      }
      if (index === array.length - 1 && array[index - 1] % 2 !== 0) {
        result[index] = 0;
        return result;
      }
      if (array[index + 1] % 2 === 0 && array[index - 1] % 2 === 0) {
        if (array[index + 1] >= array[index - 1]) {
          result[index] = array[index + 1];
        } else {
          result[index] = array[index - 1];
        }
      }
      if (array[index + 1] % 2 !== 0 && array[index - 1] % 2 !== 0) {
        result[index] = 0;
      }
      if (array[index + 1] % 2 === 0 && array[index - 1] % 2 !== 0) {
        result[index] = array[index + 1];
      }
      if (array[index + 1] % 2 !== 0 && array[index - 1] % 2 === 0) {
        result[index] = array[index - 1];
      }
    }
    if (array[index] % 2 === 0) {
      result[index] = array[index];
    }
    index++;
    customForRecursive(index, condition, array, result);
  }
  return result;
}

/* универсальный цикл */

export function customForFunc(array, callback, index = 0, ...extraArgs) {
  try {
    if (index >= array.length) {
      return;
    }

    callback(array[index], index, array, ...extraArgs);

    customForFunc(array, callback, index + 1, ...extraArgs);
  } catch (error) {
    console.log(error);
  }
}

export function evenNumbers(value, index, array, result) {
  if (value % 2 !== 0) {
    if (index === 0 && array[index + 1] % 2 === 0) {
      result[index] = array[index + 1];
    }
    if (index === 0 && array[index + 1] % 2 !== 0) {
      result[index] = 0;
    }
    if (index === array.length - 1 && array[index - 1] % 2 === 0) {
      result[index] = array[index - 1];
      return result;
    }
    if (index === array.length - 1 && array[index - 1] % 2 !== 0) {
      result[index] = 0;
      return result;
    }
    if (array[index + 1] % 2 === 0 && array[index - 1] % 2 === 0) {
      if (array[index + 1] >= array[index - 1]) {
        result[index] = array[index + 1];
      } else {
        result[index] = array[index - 1];
      }
    }
    if (array[index + 1] % 2 !== 0 && array[index - 1] % 2 !== 0) {
      result[index] = 0;
    }
    if (array[index + 1] % 2 === 0 && array[index - 1] % 2 !== 0) {
      result[index] = array[index + 1];
    }
    if (array[index + 1] % 2 !== 0 && array[index - 1] % 2 === 0) {
      result[index] = array[index - 1];
    }
  }
  if (value % 2 === 0) {
    result[index] = value;
  }
}
