// Filters array of objects based on string value of supplied object key
export const objStringFilter = (objArr, objKey, filter) => {
  const lowerFilter = filter.toLowerCase();
  const lowerObjArr = objArr.map((val) => ({
    ...val,
    [objKey]: val[objKey].toLowerCase(),
  }));
  const filteredObjArr = lowerObjArr.filter((val) =>
    val[objKey].includes(lowerFilter)
  );
  return filteredObjArr;
};

// Filters array in an object
export const objArrFilter = (objArr, objKey, filter) => {
  const lowerFilter = filter.toLowerCase();
  const filteredObjArr = objArr.map(obj => ({
    ...obj,
    [objKey]: obj[objKey].filter(val => val.includes(lowerFilter))
  }))
  const finalFilteredArr = filteredObjArr.filter(obj => obj[objKey].length > 0)

  return finalFilteredArr;
};
