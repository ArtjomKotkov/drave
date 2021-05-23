import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'keyValue', pure: false})
export class KeyValue implements PipeTransform {
  transform(value: any, args: any[] | null = null): any {
    const keys = Object.keys(value);
    return keys.map(key => {
      return {
        key,
        value: value[key]
      };
    });
  }
}
