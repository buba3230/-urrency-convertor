import { Component, Input, input } from '@angular/core';
import { ICurrency } from '../../currency-data-access/currency.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  EUR: ICurrency | undefined;
  USD: ICurrency | undefined;
  @Input() set rate(value: ICurrency[]) {
    this.EUR = value.find(item => item.cc === 'EUR');
    this.USD = value.find(item => item.cc === 'USD');
  }

}
