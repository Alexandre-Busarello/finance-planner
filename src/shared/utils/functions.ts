export default {
  groupBy<T>(
    list: Array<T>,
    keyGetter: (item: T) => string | number,
  ): Map<string | number, T[]> {
    const map = new Map<string | number, T[]>();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  },
};
