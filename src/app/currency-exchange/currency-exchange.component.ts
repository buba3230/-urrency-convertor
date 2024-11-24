import { Component } from '@angular/core';
import { Observable, Subscription, map, withLatestFrom } from 'rxjs';
import { ICurrency } from '../currency-data-access/currency.models';
import {
  selectCurrencySelector,
  selectErrorSelector,
} from '../currency-data-access/currency.selector';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getCurrencyRate } from '../currency-data-access/currency.actions';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrl: './currency-exchange.component.scss',
})
export class CurrencyExchangeComponent {
  currency$: Observable<ICurrency[] | null> = this.store.select(
    selectCurrencySelector
  ).pipe(
    map((rate: ICurrency[] | null) => {
      if (!rate) {
        return null;
      }
      const UAH = [{
        r030: 99999,
        txt: 'Украинская гривна',
        rate: 1,
        cc: 'UAH',
        exchangedate: rate[0].exchangedate
      }];
      return [...rate, 
        ...UAH
      ];
    })
  );
  error$: Observable<HttpErrorResponse | null> =
    this.store.select(selectErrorSelector);

  constructor(private store: Store) {}

  fromIControl = new FormControl({ value: 0, disabled: false });
  fromCurrencyControl = new FormControl();

  toControl = new FormControl({ value: 0, disabled: false });
  toCurrencyControl = new FormControl();

  currencyForm = new FormGroup({
    fromAmount: this.fromIControl,
    fromCurrency: this.fromCurrencyControl,
    toAmount: this.toControl,
    toCurrency: this.toCurrencyControl,
  });

  fromSubscription: Subscription;
  fromCCSubscription: Subscription;
  toSubscription: Subscription;
  toCCSubscription: Subscription;

  ngOnInit(): void {
    this.store.dispatch(getCurrencyRate());
  }

  fromFieldSubscribe(): void {
    this.fromSubscription = this.fromIControl.valueChanges
      .pipe(withLatestFrom(this.currency$))
      .subscribe(([value, rate]) => {
        if (
          value &&
          rate &&
          this.fromCurrencyControl.value &&
          this.toCurrencyControl.value
        ) {
          const toCc = this.toCurrencyControl.value;
          const fromCc = this.fromCurrencyControl.value;
          const UAH =
            value * (rate.find((item) => item.cc === fromCc)?.rate ?? 0);
          const result =
            UAH / (rate.find((item) => item.cc === toCc)?.rate ?? 0);
          this.toControl.patchValue(result);
        }
      });
  }

  fromFieldUnsubscribe(): void {
    if (this.fromSubscription) {
      this.fromSubscription.unsubscribe();
    }
  }

  fromCCFieldSubscribe(): void {
    this.fromCCFieldUnsubscribe();
    this.fromCCSubscription = this.fromCurrencyControl.valueChanges
      .pipe(withLatestFrom(this.currency$))
      .subscribe(([value, rate]) => {
        if (
          value &&
          rate &&
          this.fromIControl.value &&
          this.toCurrencyControl.value
        ) {
          const fromValue = this.fromIControl.value;
          const toCc = this.toCurrencyControl.value;
          const UAH = fromValue * (rate.find((item) => item.cc === value)?.rate ?? 0);
          const result =
            UAH / (rate.find((item) => item.cc === toCc)?.rate ?? 0);
          this.toControl.patchValue(result);
        }
      });
  }

  fromCCFieldUnsubscribe(): void {
    if (this.fromCCSubscription) {
      this.fromCCSubscription.unsubscribe();
    }
  }

  toFieldSubscribe(): void {
    this.toSubscription = this.toControl.valueChanges
      .pipe(withLatestFrom(this.currency$))
      .subscribe(([value, rate]) => {
        if (
          value &&
          rate &&
          this.toCurrencyControl.value &&
          this.fromCurrencyControl.value
        ) {
          const toCc = this.toCurrencyControl.value;
          const fromCc = this.fromCurrencyControl.value;
          const UAH =
            value * (rate.find((item) => item.cc === toCc)?.rate ?? 0);
          const result =
            UAH / (rate.find((item) => item.cc === fromCc)?.rate ?? 0);
          this.fromIControl.patchValue(result);
        }
      });
  }

  toFieldUnsubscribe(): void {
    if (this.toSubscription) {
      this.toSubscription.unsubscribe();
    }
  }

  toCCFieldSubscribe(): void {
    this.toCCFieldUnsubscribe();
    this.toCCSubscription = this.toCurrencyControl.valueChanges
      .pipe(withLatestFrom(this.currency$))
      .subscribe(([value, rate]) => {
        if (
          value &&
          rate &&
          this.toControl.value &&
          this.fromCurrencyControl.value
        ) {
          const toValue = this.toControl.value;
          const fromCc = this.fromCurrencyControl.value;
          const UAH = toValue * (rate.find((item) => item.cc === value)?.rate ?? 0);
          const result =
            UAH / (rate.find((item) => item.cc === fromCc)?.rate ?? 0);
          this.fromIControl.patchValue(result);
        }
      });
  }

  toCCFieldUnsubscribe(): void {
    if (this.toCCSubscription) {
      this.toCCSubscription.unsubscribe();
    }
  }
}
