/**
 * @desc Decompose date into year, month, day
 * @param date
 * @returns {year: number, month: number, day: number}
 */
export const decomposeDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {year, month, day};
};
