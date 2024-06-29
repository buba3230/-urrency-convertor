import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyEffects } from '../currency-data-access/currency.effects';
import { CurrencyExchangeComponent } from './currency-exchange.component';
import { CurrencyService } from '../currency-data-access/currency.service';
import { reducer } from '../currency-data-access/currency.reducer';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CurrencyExchangeComponent
  },
];

@NgModule({
  declarations: [CurrencyExchangeComponent, HeaderComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EffectsModule.forRoot([]),
    RouterModule.forChild(routes),
    StoreModule.forFeature('currency', reducer),
    EffectsModule.forFeature([CurrencyEffects]),
  ],
  exports: [CurrencyExchangeComponent, HttpClientModule],
  providers: [CurrencyService],
})
export class CurrencyExchangeModule {}
