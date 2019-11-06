import React, { ChangeEvent, FunctionComponent, useCallback } from "react";

interface IInputProps {
  value: string;
  onInputChange: (value: string) => void;
  valueToAdd: boolean;
}

// We use this pattern to take out zeros from the left
const patternLeftZeros = /^0+/;
// We use this pattern to get numbers with 2 decimals
const patternFor2Decimals = /^[0-9]{1,6}[.]?([0-9]{1,2})?$/;

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
        const parsedValue = evtValue.replace(patternLeftZeros, "");
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
