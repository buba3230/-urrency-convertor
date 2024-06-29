import { Injectable } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  getCurrencyRate,
  getCurrencyRateFailure,
  getCurrencyRateSuccess,
} from './currency.actions';
import { ICurrency } from './currency.models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CurrencyEffects {
  loadCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrencyRate),
      switchMap(() => {
        return this.currencyService.getCurrencyRate$().pipe(
          map((data: ICurrency[]) => {
            return getCurrencyRateSuccess({ data });
          })
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return of(getCurrencyRateFailure({ error }));
      })
    )
  );

  constructor(
    private currencyService: CurrencyService,
    private actions$: Actions
  ) {}
}
