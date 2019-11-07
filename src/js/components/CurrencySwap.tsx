import React, { FunctionComponent } from "react";

import { RefreshIcon } from "js/components/icons/RefreshIcon";

export interface ICurrencySwapProps {
  onClick: () => void;
}

export const CurrencySwap: FunctionComponent<ICurrencySwapProps> = ({
  onClick
}) => {
  return (
    <button onClick={onClick} className="swap-currency-button">
      <RefreshIcon />
    </button>
  );
};
