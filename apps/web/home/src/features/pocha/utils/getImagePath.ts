export const getMenuImagePath = (menuID: number) => {
  const currentPocha = "w25_last_pocha";
  return `/pocha/${currentPocha}/${menuID}.png`;
};
