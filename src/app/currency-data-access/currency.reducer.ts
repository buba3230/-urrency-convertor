import { Action, createReducer, on } from '@ngrx/store';
import { ICurrency, ICurrencyState } from './currency.models';
import {
  getCurrencyRate,
  getCurrencyRateFailure,
  getCurrencyRateSuccess,
} from './currency.actions';

export const initialState: ICurrencyState = {
  currency: null,
  error: null,
};

export const currencyReducer = createReducer(
  initialState,
  on(getCurrencyRate, (state): ICurrencyState => ({ ...state })),
  on(
    getCurrencyRateSuccess,
    (state, action): ICurrencyState => ({ ...state, currency: action.data })
  ),
  on(
    getCurrencyRateFailure,
    (state, action): ICurrencyState => ({ ...state, error: action.error })
  )
);

export function reducer(state: ICurrencyState, action: Action) {
  return currencyReducer(state, action);
}
