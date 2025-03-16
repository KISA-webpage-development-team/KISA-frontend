export const getMenuImagePath = (menuID: number) => {
  const currentPocha = "w25_valentine_pocha";
  return `/pocha/${currentPocha}/${menuID}.png`;
};
