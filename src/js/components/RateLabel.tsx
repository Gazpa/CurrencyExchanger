import React, { FunctionComponent, useState, useMemo } from "react";
import { connect, MapStateToProps } from "react-redux";

import { IRates, RATES_WE_USE, currencySymbols } from "js/store/actions/types";
import { IStoreState } from "js/store/reducers";
import { calculateValueBetweenCurrencies } from "js/utils/services";
import { LeftArrowIcon } from "js/components/icons/LeftArrowIcon";
import { MAX_DECIMALS_RATE_LABEL } from "js/utils/constants";

export interface IRateLabelProps {
  currencyFrom: RATES_WE_USE;
  currencyTo: RATES_WE_USE;
  rates: IRates;
}

export const RateLabelComponent: FunctionComponent<IRateLabelProps> = ({
  currencyFrom,
  currencyTo,
  rates
}) => {
  const [arrowGoingUp, setArrowGoingUp] = useState(false);

  const rateLabelValue = useMemo(() => {
    const changeValue = calculateValueBetweenCurrencies(
      1,
      currencyFrom,
      currencyTo,
      MAX_DECIMALS_RATE_LABEL,
      rates
    );
    const changeValueIsPositive = Number(changeValue) >= 1;
    setArrowGoingUp(changeValueIsPositive);

    return `${currencySymbols[currencyFrom]} 1 = ${currencySymbols[currencyTo]} ${changeValue}`;
    // We need to listen to rate changes, careful on forgetting another value in here
    // eslint-disable-next-line
  }, [currencyFrom, currencyTo, rates]);

  if (Object.entries(rates).length > 0) {
    return (
      <div className={`rate-label ${arrowGoingUp ? "arrow-up" : "arrow-down"}`}>
        <LeftArrowIcon />
        <span>{rateLabelValue}</span>
      </div>
    );
  } else {
    return null;
  }
};

type TMapStateProps = Pick<IRateLabelProps, "rates">;

const mapStateToProps: MapStateToProps<TMapStateProps, {}, IStoreState> = ({
  currencyRates: { rates }
}) => ({
  rates: rates || {}
});

export const RateLabel = connect(
  mapStateToProps,
  {}
)(RateLabelComponent);
