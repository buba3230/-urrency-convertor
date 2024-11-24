import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ICurrency } from './currency.models';

export const getCurrencyRate = createAction('[CURRENCY] = Get currency');
export const getCurrencyRateSuccess = createAction(
  '[CURRENCY] = Get currency success',
  props<{ data: ICurrency[] }>()
);
export const getCurrencyRateFailure = createAction(
  '[CURRENCY] = Get currency failure',
  props<{ error: HttpErrorResponse }>()
);
