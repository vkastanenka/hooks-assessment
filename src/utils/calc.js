// Function to calculate average of an array (first converts strings to numbers)
export const calcAve = arr => {
  const total = arr.map(value => Number(value)).reduce((acc, v) => acc + v);
  const ave = (total / arr.length).toFixed(3);
  return `${ave}%`
}