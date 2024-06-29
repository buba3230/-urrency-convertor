import { HttpErrorResponse } from "@angular/common/http";

export interface ICurrency {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export interface ICurrencyState {
  currency: ICurrency[] | null;
  error: HttpErrorResponse | null;
}