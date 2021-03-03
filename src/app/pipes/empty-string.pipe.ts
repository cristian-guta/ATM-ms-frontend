import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'emptyString'})
export class EmptyStringPipe implements PipeTransform {
    transform(value: string): string {
        return value && value.trim() ? value : '-';
    }
}
