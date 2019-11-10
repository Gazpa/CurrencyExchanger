import { calculateValueBetweenCurrencies } from "js/utils/services";
import { RATES_WE_USE, IRates } from "js/store/actions/types";

const mockStoreRates: IRates = {
  [RATES_WE_USE.EUR]: 1,
  [RATES_WE_USE.GBP]: 0.8,
  [RATES_WE_USE.USD]: 0.1
};

describe("calculateValueBetweenCurrencies function", () => {
  const valueToCalculate = 1.45;
  const numDecimals = 2;

  it("returns value hicher than 1", () => {
    const returnValue = calculateValueBetweenCurrencies(
      valueToCalculate,
      RATES_WE_USE.EUR,
      RATES_WE_USE.GBP,
      numDecimals,
      mockStoreRates
    );

    expect(Number(returnValue)).toBeGreaterThanOrEqual(1);
  });

  it("returns value hicher than 1", () => {
    const returnValue = calculateValueBetweenCurrencies(
      valueToCalculate,
      RATES_WE_USE.EUR,
      RATES_WE_USE.USD,
      numDecimals,
      mockStoreRates
    );

    expect(Number(returnValue)).toBeLessThanOrEqual(1);
  });
});
