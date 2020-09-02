import BigNumber from "bignumber.js";

export const getNumber = (balance: BigNumber) => {
  return balance.dividedBy(new BigNumber(10).pow(0)).toFixed();
};
