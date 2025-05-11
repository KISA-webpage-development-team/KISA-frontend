const calculateStripeFee = (amount: number) => {
  // calculate fee based on the amount
  return parseFloat((amount * 0.031 + 0.3).toFixed(2));
};

const calculateStripeTotalPrice = (amount: number) => {
  return parseFloat((amount + calculateStripeFee(amount)).toFixed(2));
};

export { calculateStripeFee, calculateStripeTotalPrice };
