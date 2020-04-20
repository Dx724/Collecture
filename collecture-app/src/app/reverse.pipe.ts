import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Array<Object>, ...args: unknown[]): unknown {
    return value.slice().reverse();
  }

}
