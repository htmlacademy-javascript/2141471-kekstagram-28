const checkStringLength = (str, maxLength) => str.length <= maxLength;

const extractNumbers = (str) => {
  let numberStr = '';

  for (let i = 0; i <= str.length; i++) {
    const letter = parseInt(str[i], 10);
    if (!isNaN(letter)) {
      numberStr += letter;
    }
  }

  if (numberStr.length) {
    return parseInt(numberStr, 10);
  }

  return NaN;
};

checkStringLength('function', 5);

extractNumbers('local2 56gg');
