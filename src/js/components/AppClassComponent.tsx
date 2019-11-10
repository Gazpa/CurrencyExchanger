import React from "react";
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

interface IState {
  selectedCurrencyFrom: RATES_WE_USE;
  selectedCurrencyTo: RATES_WE_USE;
  inputToSubtractFromValue: string;
  inputToAddValue: string;
  errorMessage: string;
}

class AppComponent extends React.Component<IAppComponentProps, IState> {
  interval = 0;

  constructor(props: IAppComponentProps) {
    super(props);

    this.state = {
      selectedCurrencyFrom: RATES_WE_USE.EUR,
      selectedCurrencyTo: RATES_WE_USE.EUR,
      inputToSubtractFromValue: "",
      inputToAddValue: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.props.fetchLatest();
    this.interval = window.setInterval(
      () => this.props.fetchLatest(),
      POLL_INTERVAL
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChangeInputSubtractFrom = (value: string) => {
    const { selectedCurrencyTo, selectedCurrencyFrom } = this.state;
    const parsedValue = Number(value);
    const newValue = calculateValueBetweenCurrencies(
      parsedValue,
      selectedCurrencyFrom,
      selectedCurrencyTo,
      MAX_DECIMALS_POCKETS,
      this.props.rates
    );

    this.setState({
      errorMessage: "",
      inputToSubtractFromValue: value,
      inputToAddValue: newValue
    });
  };

  onChangeSelectedCurrencyFrom = (rate: TRatesWeUse) => {
    const { selectedCurrencyTo, inputToSubtractFromValue } = this.state;
    const parsedValue = Number(inputToSubtractFromValue);
    const newValue = calculateValueBetweenCurrencies(
      parsedValue,
      rate,
      selectedCurrencyTo,
      MAX_DECIMALS_POCKETS,
      this.props.rates
    );

    this.setState({
      errorMessage: "",
      selectedCurrencyFrom: rate,
      inputToAddValue: newValue
    });
  };

  onChangeInputToAdd = (value: string) => {
    const { selectedCurrencyTo, selectedCurrencyFrom } = this.state;
    const parsedValue = Number(value);
    const newValue = calculateValueBetweenCurrencies(
      parsedValue,
      selectedCurrencyFrom,
      selectedCurrencyTo,
      MAX_DECIMALS_POCKETS,
      this.props.rates
    );

    this.setState({
      errorMessage: "",
      inputToSubtractFromValue: newValue,
      inputToAddValue: value
    });
  };

  onChangeSelectedCurrencyTo = (rate: TRatesWeUse) => {
    const { inputToSubtractFromValue, selectedCurrencyFrom } = this.state;

    const parsedValue = Number(inputToSubtractFromValue);
    const newValue = calculateValueBetweenCurrencies(
      parsedValue,
      selectedCurrencyFrom,
      rate,
      MAX_DECIMALS_POCKETS,
      this.props.rates
    );

    this.setState({
      errorMessage: "",
      selectedCurrencyTo: rate,
      inputToAddValue: newValue
    });
  };

  onClickExchangeButton = () => {
    const {
      selectedCurrencyFrom,
      selectedCurrencyTo,
      inputToSubtractFromValue,
      inputToAddValue
    } = this.state;
    const { balances, subtractFromBalance, addToBalance } = this.props;

    const parsedSubtractFromValue = Number(inputToSubtractFromValue);
    const parsedToAddValue = Number(inputToAddValue);
    const userIsInDebt =
      balances[selectedCurrencyFrom] - parsedSubtractFromValue < MAX_DEBT;
    const noAmountToSubtract = parsedSubtractFromValue === 0;
    if (userIsInDebt) {
      this.setState({ errorMessage: "Your balance is too low" });
    } else if (noAmountToSubtract) {
      this.setState({ errorMessage: "Please enter an amount" });
    } else {
      subtractFromBalance(selectedCurrencyFrom, parsedSubtractFromValue);
      addToBalance(selectedCurrencyTo, parsedToAddValue);

      this.setState({
        inputToSubtractFromValue: "",
        inputToAddValue: ""
      });
    }
  };

  onClickCurrencySwap = () => {
    this.setState(state => ({
      selectedCurrencyFrom: state.selectedCurrencyTo,
      selectedCurrencyTo: state.selectedCurrencyFrom
    }));
  };

  render() {
    const {
      errorMessage,
      selectedCurrencyFrom,
      selectedCurrencyTo,
      inputToSubtractFromValue,
      inputToAddValue
    } = this.state;
    const { balances } = this.props;

    return (
      <div className="app">
        <Logo />
        <Pocket
          selectedCurrency={selectedCurrencyFrom}
          onSelectChange={this.onChangeSelectedCurrencyFrom}
          balance={balances[selectedCurrencyFrom]}
          inputValue={inputToSubtractFromValue}
          onInputChange={this.onChangeInputSubtractFrom}
          pocketToAdd={false}
        />
        <Tools
          onClickCurrencySwap={this.onClickCurrencySwap}
          currencyFrom={selectedCurrencyFrom}
          currencyTo={selectedCurrencyTo}
        />
        <Pocket
          selectedCurrency={selectedCurrencyTo}
          onSelectChange={this.onChangeSelectedCurrencyTo}
          balance={balances[selectedCurrencyTo]}
          inputValue={inputToAddValue}
          onInputChange={this.onChangeInputToAdd}
          pocketToAdd={true}
        />
        <ExchangeButton
          errorMessage={errorMessage}
          onClick={this.onClickExchangeButton}
        />
      </div>
    );
  }
}

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
