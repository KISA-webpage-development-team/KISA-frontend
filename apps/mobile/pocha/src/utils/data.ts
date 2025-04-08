/**
 * @desc Decompose date into year, month, day
 * @param date Date object or ISO date string
 * @returns {year: number, month: number, day: number}
 */
export const decomposeDate = (date: Date | string) => {
  // Convert to Date object if string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const result = {year, month, day};
  return result;
};
