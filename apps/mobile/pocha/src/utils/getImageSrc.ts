const menuImages: Record<number, ReturnType<typeof require>> = {
  8: require('@/assets/images/menu/8.png'),
  9: require('@/assets/images/menu/9.png'),
  10: require('@/assets/images/menu/10.png'),
  11: require('@/assets/images/menu/11.png'),
  12: require('@/assets/images/menu/12.png'),
  13: require('@/assets/images/menu/13.png'),
  14: require('@/assets/images/menu/14.png'),
  15: require('@/assets/images/menu/15.png'),
  16: require('@/assets/images/menu/16.png'),
  17: require('@/assets/images/menu/17.png'),
  // ... add all your menu images here
} as const;

export const getMenuImageSrc = (menuID: number) => {
  return menuImages[menuID] || require('@/assets/images/menu/default.png');
};
