import React, { FunctionComponent, ChangeEvent } from "react";

import { RATES_WE_USE } from "js/store/actions/types";

export interface ICurrencySelectProps {
  onChangeSelection: (rate: RATES_WE_USE) => void;
  selectedValue: RATES_WE_USE;
  oppositeSelectedValue?: RATES_WE_USE;
}

const displayOptions = (oppositeSelectedValue?: RATES_WE_USE) => {
  return Object.keys(RATES_WE_USE)
    .filter(rate => rate !== oppositeSelectedValue)
    .map(rate => (
      <option key={rate} value={rate}>
        {rate}
      </option>
    ));
};

export const CurrencySelect: FunctionComponent<ICurrencySelectProps> = ({
  selectedValue,
  oppositeSelectedValue,
  onChangeSelection
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeSelection(event.target.value as RATES_WE_USE);
  };

  return (
    <select
      onChange={handleChange}
      value={selectedValue}
      className="select-css"
    >
      {displayOptions(oppositeSelectedValue)}
    </select>
  );
};
