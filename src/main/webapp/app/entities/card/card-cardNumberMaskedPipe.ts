import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cardNumberMasked' })
export class CardNumberMaskedPipe implements PipeTransform {
  transform(cardNumber: number): string {
    const cardNumberAsString = cardNumber.toString();
    const prefix = cardNumberAsString.substring(0, 4) + '-';
    let maskedValue = '';
    for (let x = 1; x <= cardNumberAsString.length; x++) {
        maskedValue += 'x';
        // add hyphen every 4 numeric digits
        if (x % 4 === 0 && x > 0 && x !== cardNumberAsString.length) {
            maskedValue += '-';
        }
    }
    return prefix + maskedValue;
  }
}
