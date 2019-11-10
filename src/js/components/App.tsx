import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback
} from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { Pocket } from "js/components/Pocket";
import { Logo } from "js/components/Logo";
import { ExchangeButton } from "js/components/ExchangeButton";
import { Tools } from "js/components/Tools";

import { RATES_WE_USE, TRatesWeUse, IRates } from "js/store/actions/types";
import { fetchLatestAction } from "js/store/actions/currencyRatesActions";
import {
  addToBalanceAction,
  subtractFromBalanceAction
} from "js/store/actions/balancesActions";
import { IStoreState } from "js/store/reducers";
import { IBalancesState } from "js/store/reducers/balancesReducer";
import { calculateValueBetweenCurrencies } from "js/utils/services";
import {
  MAX_DEBT,
  MAX_DECIMALS_POCKETS,
  POLL_INTERVAL
} from "js/utils/constants";

interface IAppComponentProps {
  fetchLatest: () => void;
  subtractFromBalance: (currency: RATES_WE_USE, value: number) => void;
  addToBalance: (currency: RATES_WE_USE, value: number) => void;
  balances: IBalancesState;
  rates: IRates | {};
}

const AppComponent: FunctionComponent<IAppComponentProps> = ({
  fetchLatest,
  subtractFromBalance,
  addToBalance,
  balances,
  rates
}) => {
  // State could be managed by useReducer to avoid multiple renderings
  // and making the code cleaner and more readable.
  // At the moment useState works good, and we don't have many
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState(
    RATES_WE_USE.EUR
  );
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState(
    RATES_WE_USE.EUR
  );
  const [inputToSubtractFromValue, setInputToSubtractFromValue] = useState("");
  const [inputToAddValue, setInputToAddValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLatest();
    const interval = setInterval(() => fetchLatest(), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLatest]);

  const onChangeInputSubtractFrom = useCallback(
    (value: string) => {
      const parsedValue = Number(value);
      const newValue = calculateValueBetweenCurrencies(
        parsedValue,
        selectedCurrencyFrom,
        selectedCurrencyTo,
        MAX_DECIMALS_POCKETS,
        rates
      );

      setErrorMessage("");
      setInputToSubtractFromValue(value);
      setInputToAddValue(newValue);
    },
    [selectedCurrencyFrom, selectedCurrencyTo, rates]
  );

  const onChangeSelectedCurrencyFrom = useCallback(
    (rate: TRatesWeUse) => {
      const parsedValue = Number(inputToSubtractFromValue);
      const newValue = calculateValueBetweenCurrencies(
        parsedValue,
        rate,
        selectedCurrencyTo,
        MAX_DECIMALS_POCKETS,
        rates
      );

      setErrorMessage("");
      setSelectedCurrencyFrom(rate);
      setInputToAddValue(newValue);
    },
    [
      setInputToAddValue,
      setSelectedCurrencyFrom,
      selectedCurrencyTo,
      inputToSubtractFromValue,
      rates
    ]
  );

  const onChangeInputToAdd = useCallback(
    (value: string) => {
      const parsedValue = Number(value);
      const newValue = calculateValueBetweenCurrencies(
        parsedValue,
        selectedCurrencyFrom,
        selectedCurrencyTo,
        MAX_DECIMALS_POCKETS,
        rates
      );

      setErrorMessage("");
      setInputToSubtractFromValue(newValue);
      setInputToAddValue(value);
    },
    [selectedCurrencyFrom, selectedCurrencyTo, rates]
  );

  const onChangeSelectedCurrencyTo = useCallback(
    (rate: TRatesWeUse) => {
      const parsedValue = Number(inputToSubtractFromValue);
      const newValue = calculateValueBetweenCurrencies(
        parsedValue,
        selectedCurrencyFrom,
        rate,
        MAX_DECIMALS_POCKETS,
        rates
      );

      setErrorMessage("");
      setSelectedCurrencyTo(rate);
      setInputToAddValue(newValue);
    },
    [
      inputToSubtractFromValue,
      selectedCurrencyFrom,
      setInputToAddValue,
      setSelectedCurrencyTo,
      rates
    ]
  );

  const onClickExchangeButton = useCallback(() => {
    const parsedSubtractFromValue = Number(inputToSubtractFromValue);
    const parsedToAddValue = Number(inputToAddValue);
    const userIsInDebt =
      balances[selectedCurrencyFrom] - parsedSubtractFromValue < MAX_DEBT;
    const noAmountToSubtract = parsedSubtractFromValue === 0;
    if (userIsInDebt) {
      setErrorMessage("Your balance is too low");
    } else if (noAmountToSubtract) {
      setErrorMessage("Please enter an amount");
    } else {
      subtractFromBalance(selectedCurrencyFrom, parsedSubtractFromValue);
      addToBalance(selectedCurrencyTo, parsedToAddValue);

      setInputToSubtractFromValue("");
      setInputToAddValue("");
    }
  }, [
    balances,
    selectedCurrencyFrom,
    selectedCurrencyTo,
    inputToSubtractFromValue,
    inputToAddValue,
    addToBalance,
    subtractFromBalance
  ]);

  const onClickCurrencySwap = useCallback(() => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);

    setInputToSubtractFromValue(inputToAddValue);
    setInputToAddValue(inputToSubtractFromValue);
  }, [
    selectedCurrencyTo,
    selectedCurrencyFrom,
    inputToAddValue,
    inputToSubtractFromValue
  ]);

  return (
    <div className="app">
      <Logo />
      <Pocket
        selectedCurrency={selectedCurrencyFrom}
        onSelectChange={onChangeSelectedCurrencyFrom}
        balance={balances[selectedCurrencyFrom]}
        inputValue={inputToSubtractFromValue}
        onInputChange={onChangeInputSubtractFrom}
        pocketToAdd={false}
      />
      <Tools
        onClickCurrencySwap={onClickCurrencySwap}
        currencyFrom={selectedCurrencyFrom}
        currencyTo={selectedCurrencyTo}
      />
      <Pocket
        selectedCurrency={selectedCurrencyTo}
        onSelectChange={onChangeSelectedCurrencyTo}
        balance={balances[selectedCurrencyTo]}
        inputValue={inputToAddValue}
        onInputChange={onChangeInputToAdd}
        pocketToAdd={true}
      />
      <ExchangeButton
        errorMessage={errorMessage}
        onClick={onClickExchangeButton}
      />
    </div>
  );
};

type TMapStateProps = Pick<IAppComponentProps, "balances" | "rates">;

const mapStateToProps: MapStateToProps<TMapStateProps, {}, IStoreState> = ({
  balances,
  currencyRates: { rates }
}) => ({
  balances,
  rates
});

type TMapDispatchProps = Pick<
  IAppComponentProps,
  "fetchLatest" | "addToBalance" | "subtractFromBalance"
>;

const mapDispatchToProps: MapDispatchToProps<TMapDispatchProps, {}> = {
  fetchLatest: fetchLatestAction,
  addToBalance: addToBalanceAction,
  subtractFromBalance: subtractFromBalanceAction
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
