import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICurrency } from "./currency.models";

@Injectable()
export class CurrencyService {

private apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) { }

  getCurrencyRate$(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(this.apiUrl);
  }
}