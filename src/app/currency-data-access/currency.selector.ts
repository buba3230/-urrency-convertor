import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICurrencyState } from "./currency.models";

export const currencyFeatureSelector =
  createFeatureSelector<ICurrencyState>('currency');
  
export const selectCurrencySelector = createSelector(
    currencyFeatureSelector,
  (currencyState: ICurrencyState) => currencyState.currency
);

export const selectErrorSelector = createSelector(
    currencyFeatureSelector,
  (currencyState: ICurrencyState) => currencyState.error
);
