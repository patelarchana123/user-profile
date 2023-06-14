import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, maxLength: number = 3): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '';
    }
    return value;
  }

}
