import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Array<Object>, ...args: unknown[]): unknown {
    return value ? value.slice().reverse() : null; //Don't slice a null input
  }

}
