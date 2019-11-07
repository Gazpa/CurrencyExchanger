import React, { FunctionComponent, ChangeEvent } from "react";

import { RATES_WE_USE, TRatesWeUse } from "js/store/actions/types";

export interface ICurrencySelectProps {
  onChangeSelection: (rate: TRatesWeUse) => void;
  selectedValue: TRatesWeUse;
}

const displayOptions = () => {
  return Object.keys(RATES_WE_USE).map(rate => (
    <option key={rate} value={rate}>
      {rate}
    </option>
  ));
};

export const CurrencySelect: FunctionComponent<
  ICurrencySelectProps
> = props => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    props.onChangeSelection(event.target.value as TRatesWeUse);
  };

  return (
    <select
      onChange={handleChange}
      value={props.selectedValue}
      className="select-css"
    >
      {displayOptions()}
    </select>
  );
};
