import React, { ChangeEvent, FunctionComponent, useCallback } from "react";

import {
  MAX_NUMBER_LENGTH_WITH_DECIMALS,
  MAX_NUMBER_LENGTH
} from "js/utils/constants";

export interface IInputProps {
  value: string;
  onInputChange: (value: string) => void;
  valueToAdd: boolean;
}

// We use this pattern to take out zeros that are of no use
const patternZeros = /^0+([.]00)?$/;
// We use this pattern to take out the first zero to the left if any
const patternFirstZero = /^0[0-9]+?/;
// We use this pattern to get numbers with 2 decimals
const patternFor2Decimals = /(^[0-9]+[.][0-9]{1,2}?$)|(^[0-9]+[.]?$)/;

export const Input: FunctionComponent<IInputProps> = ({
  value,
  onInputChange,
  valueToAdd
}) => {
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const evtValue = event.target.value;
      const regex = new RegExp(patternFor2Decimals);
      const matchesRegExp = regex.test(evtValue);

      if (matchesRegExp) {
        // Only update the value if it matches the expression
        const maxLengthOfNumber = evtValue.includes(".")
          ? MAX_NUMBER_LENGTH_WITH_DECIMALS
          : MAX_NUMBER_LENGTH;
        let parsedValue =
          evtValue.length > maxLengthOfNumber
            ? event.target.defaultValue
            : evtValue;
        if (parsedValue.length > maxLengthOfNumber) parsedValue = "";
        parsedValue = parsedValue.replace(patternZeros, "0");

        const regexFirstZero = new RegExp(patternFirstZero);
        const matchesRegExpFirstZero = regexFirstZero.test(parsedValue);

        if (matchesRegExpFirstZero) parsedValue = parsedValue.slice(1);
        onInputChange(parsedValue);
      } else if (evtValue === "") {
        // If the user is trying to clear the input
        onInputChange("");
      }
    },
    [onInputChange]
  );

  return (
    <div className="input-wrapper">
      <span>{valueToAdd ? "+" : "-"}</span>
      <input
        onChange={handleInputChange}
        value={value}
        placeholder="0"
        type="text"
      />
    </div>
  );
};
