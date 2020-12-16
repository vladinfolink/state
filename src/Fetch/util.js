export function omit(obj, arr) {
  return Object.keys(obj)
    .filter(function (k) {
      return !arr.includes(k);
    })
    .reduce(function (acc, key) {
      return (acc[key] = obj[key]), acc;
    }, {});
}
