import React, { FunctionComponent } from "react";

import { CurrencySelect } from "js/components/CurrencySelect";
import { BalanceLabel } from "js/components/BalanceLabel";
import { Input } from "js/components/Input";
import { RATES_WE_USE } from "js/store/actions/types";

export interface IPocketProps {
  selectedCurrency: RATES_WE_USE;
  oppositeSelectedCurrency?: RATES_WE_USE;
  onSelectChange: (rate: RATES_WE_USE) => void;
  balance: number;
  inputValue: string;
  onInputChange: (value: string) => void;
  pocketToAdd: boolean;
}

export const Pocket: FunctionComponent<IPocketProps> = ({
  selectedCurrency,
  oppositeSelectedCurrency,
  onSelectChange,
  balance,
  inputValue,
  onInputChange,
  pocketToAdd
}) => {
  return (
    <div className={`pocket ${pocketToAdd ? "to-add" : "to-subtract"}`}>
      <div className="pocket-left-section">
        <CurrencySelect
          selectedValue={selectedCurrency}
          oppositeSelectedValue={oppositeSelectedCurrency}
          onChangeSelection={onSelectChange}
        />
        <BalanceLabel selectedCurrency={selectedCurrency} balance={balance} />
      </div>
      <div className="pocket-right-section">
        <Input
          value={inputValue}
          onInputChange={onInputChange}
          valueToAdd={pocketToAdd}
        />
      </div>
    </div>
  );
};
