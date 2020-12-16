export function skipKey(object, array) {
  return Object.keys(object)
    .filter(function (item) {
      return !array.includes(item);
    })
    .reduce(function (accessor, key) {
      return (accessor[key] = object[key]), accessor;
    }, {});
}

export function genUniqStrFromKeys(object, string = "") {
  return Object.keys(object).reduce((ini, key) => {
    const prepend = string.length ? string + "." : "";
    if (typeof object[key] === "object") {
      Object.assign(ini, genUniqStrFromKeys(object[key], prepend + key));
    } else {
      ini[prepend + key] = object[key];
    }
    return ini
  }, {});
}
