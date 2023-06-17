import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRound'
})
export class NumberRoundPipe implements PipeTransform {

  transform(value: any, ...args: number[]): string {
    if(value){
      return value.toFixed(args[0]);
    }
    return '';
  }

}
