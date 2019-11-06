import React, { FunctionComponent } from "react";

interface IExchangeButtonProps {
  onClick: () => void;
  errorMessage: string;
}

export const ExchangeButton: FunctionComponent<IExchangeButtonProps> = ({
  onClick,
  errorMessage
}) => {
  return (
    <div className="exchange-button-wrapper">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button className="exchange-button" onClick={onClick}>
        Exchange
      </button>
    </div>
  );
};
