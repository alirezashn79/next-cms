function ToRial(str) {
  str = str.replace(/\,/g, "");
  var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");

  while (objRegex.test(str)) {
    str = str.replace(objRegex, "$1,$2");
  }

  return str;
}

const rialToNumber = (str) => {
  const splittedStr = str.split(",");
  const newStr = splittedStr.join("");

  return newStr;
};

export { ToRial, rialToNumber };
