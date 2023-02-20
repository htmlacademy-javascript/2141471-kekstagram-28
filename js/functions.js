// function String Length

function stringLength (str, length) {
  let string = str.length;

  return (string < length) ? 'Хорошо' : 'Плохо';
}

// function Palindrome

function palindrome (str) {
  const reverseStr = (str.split('').reverse().join(''));

  return (str === reverseStr) ? 'Хорошо' : 'Плохо';
}

// function Integer

function integer (str) {
  let numberStr = '';

  for (let i = 0; i <= str.length; i++) {
    let letter = parseInt(str[i], 10);
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

function addLetter (str, num, addStr) {
  const start = str.length;
  const finish = addStr.length;
  const count = num - start;
  let newStr = '';

  if (start < num && finish === 1) {
    newStr = addStr.repeat(count) + str;
  } else if (start < num) {
    if (finish > count) {
      for (let i = 0; i < count; i++) {
        newStr += addStr[i];
      }
      newStr += str;

      return newStr;
    } else {
      let count1 = count - finish;
      let secStr = '';

      for (let char of addStr) {
        newStr += char;
      }
      for (let i = 0; i < count1; i++) {
        secStr += addStr[i];
      }
      newStr = secStr + newStr + str;

      return newStr;
    }
  }

  return str;
}

stringLength ('function',5);
palindrome ('система');
integer ('а2 я4 т4омат');
addLetter ('q', 7, 'wes');
