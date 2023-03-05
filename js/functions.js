// function checkStringLength

function checkStringLength (str, maxLength) {

  return str.length <= maxLength;
}

// function isPalindrome

function isPalindrome (str) {
  const reverseStr = (str.split('').reverse().join(''));

  return str === reverseStr;
}

// function extractNumbers

function extractNumbers (str) {
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
}

// function Addletter

function formingStringChar (str, num, addStr) {
  const start = str.length;
  const finish = addStr.length;
  const count = num - start;
  let newStr = '';
  let secStr = '';

  if (str.length >= num) {
    return str;
  }

  if (finish === 1) {
    return addStr.repeat(count) + str;
  }

  if (finish > count) {
    for (let i = 0; i < count; i++) {
      newStr += addStr[i];
    }

    return newStr + str;
  }

  for (const char of addStr) {
    newStr += char;
  }
  for (let i = 0; i < count - finish; i++) {
    secStr += addStr[i];
  }

  return secStr + newStr + str;
}

checkStringLength ('function',5);
isPalindrome ('система');
extractNumbers ('а2 я4 т4омат');
formingStringChar ('q', 7, 'wes');
