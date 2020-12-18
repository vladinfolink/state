export function skipKey(
  object: { [x: string]: any },
  array: string | string[]
) {
  return Object.keys(object)
    .filter(function (item) {
      return !array.includes(item);
    })
    .reduce(function (accessor, key) {
      return ((accessor as any)[key] = object[key]), accessor;
    }, {});
}

export function genUniqStrFromKeys(object: { [x: string]: any }, string = "") {
  return Object.keys(object).reduce((ini, key) => {
    const prepend = string.length ? string + "." : "";
    if (typeof object[key] === "object") {
      Object.assign(ini, genUniqStrFromKeys(object[key], prepend + key));
    } else {
      (ini as any)[prepend + key] = object[key];
    }
    return ini;
  }, {});
}

export function getUniqString(object: { [x: string]: any }) {
  return Object.entries(genUniqStrFromKeys(object)).flat(Infinity).join("~~~");
}
