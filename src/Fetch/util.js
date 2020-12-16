export function omit(object, array) {
  return Object.keys(object)
    .filter(function (item) {
      return !array.includes(item);
    })
    .reduce(function (accessor, key) {
      return (accessor[key] = object[key]), accessor;
    }, {});
}
