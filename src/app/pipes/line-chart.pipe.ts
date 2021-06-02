import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineChart',
  pure:false
})
export class LineChartPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
