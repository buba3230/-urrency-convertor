import { Component } from '@angular/core';
import { Observable, combineLatest, map, take, withLatestFrom } from 'rxjs';
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

  ngOnInit(): void {
    this.store.dispatch(getCurrencyRate());
    // this.fromIControl.valueChanges
    //   .pipe(withLatestFrom(this.currency$))
    //   .subscribe(([value, rate]) => {
    //     if (
    //       value &&
    //       rate &&
    //       this.fromCurrencyControl.value &&
    //       this.toCurrencyControl.value
    //     ) {
    //       const toCc = this.toCurrencyControl.value;
    //       const fromCc = this.fromCurrencyControl.value;
          // const UAH =
          //   value * (rate.find((item) => item.cc === fromCc)?.rate ?? 0);
          // const result =
          //   UAH / (rate.find((item) => item.cc === toCc)?.rate ?? 0);
          // this.toControl.patchValue(result);
    //     }
    //   });

      // this.toControl.valueChanges
      // .pipe(withLatestFrom(this.currency$))
      // .subscribe(([value, rate]) => {
      //   if (
      //     value &&
      //     rate &&
      //     this.toCurrencyControl.value &&
      //     this.fromCurrencyControl.value
      //   ) {
      //     const toCc = this.fromCurrencyControl.value;
      //     const fromCc = this.toCurrencyControl.value;
      //     const UAH =
      //       value * (rate.find((item) => item.cc === fromCc)?.rate ?? 0);
      //     const result =
      //       UAH / (rate.find((item) => item.cc === toCc)?.rate ?? 0);
      //     this.fromIControl.patchValue(result);
      //   }
      // });

      combineLatest([
        this.fromIControl.valueChanges,
        this.fromCurrencyControl.valueChanges,
        this.toControl.valueChanges,
        this.toCurrencyControl.valueChanges
      ]).pipe(
        take(1), withLatestFrom(this.currency$)
      ).subscribe(([[from, fromCc, to, toCc], rate]) => {
        if (from && fromCc && to && toCc && rate) {
          console.log(from);
          console.log(fromCc);
          console.log(to);
          console.log(toCc);
          const UAH =
           from * (rate.find((item) => item.cc === fromCc)?.rate ?? 0);
           const result =
            UAH / (rate.find((item) => item.cc === toCc)?.rate ?? 0);
          this.toControl.patchValue(result);
        }
      })
  }
}
