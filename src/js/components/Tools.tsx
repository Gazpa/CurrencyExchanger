import React, { FunctionComponent } from "react";

import { CurrencySwap } from "js/components/CurrencySwap";
import { RateLabel } from "js/components/RateLabel";
import { RATES_WE_USE } from "js/store/actions/types";

export interface IToolsProps {
  onClickCurrencySwap: () => void;
  currencyFrom: RATES_WE_USE;
  currencyTo: RATES_WE_USE;
}

export const Tools: FunctionComponent<IToolsProps> = ({
  onClickCurrencySwap,
  currencyFrom,
  currencyTo
}) => {
  return (
    <div className="tools">
      <div className="tools-top"></div>
      <div className="tools-bottom">
        <CurrencySwap onClick={onClickCurrencySwap} />
        <RateLabel currencyFrom={currencyFrom} currencyTo={currencyTo} />
      </div>
    </div>
  );
};
