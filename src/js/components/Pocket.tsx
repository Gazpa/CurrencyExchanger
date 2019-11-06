import React, { FunctionComponent } from "react";

import { CurrencySelect } from "js/components/CurrencySelect";
import { BalanceLabel } from "js/components/BalanceLabel";
import { Input } from "js/components/Input";
import { TRatesWeUse } from "js/store/actions/types";

interface IPocketProps {
  selectedCurrency: TRatesWeUse;
  onSelectChange: (rate: TRatesWeUse) => void;
  balance: number;
  inputValue: string;
  onInputChange: (value: string) => void;
  pocketToAdd: boolean;
}

export const Pocket: FunctionComponent<IPocketProps> = ({
  selectedCurrency,
  onSelectChange,
  balance,
  inputValue,
  onInputChange,
  pocketToAdd
}) => {
  return (
    <div className="pocket">
      <div className="pocket-left-section">
        <CurrencySelect
          selectedValue={selectedCurrency}
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
