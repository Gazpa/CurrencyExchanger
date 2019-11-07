import React from "react";
import { RATES_WE_USE, currencySymbols } from "js/store/actions/types";

export interface IBalanceLabelProps {
  balance: number;
  selectedCurrency: RATES_WE_USE;
}

export const BalanceLabel = (props: IBalanceLabelProps) => {
  const balanceLabel = [
    "Balance:",
    currencySymbols[props.selectedCurrency],
    props.balance.toFixed(2)
  ].join(" ");

  return (
    <div className="balance-label">
      <span>{balanceLabel}</span>
    </div>
  );
};
