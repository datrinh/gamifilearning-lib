import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  transform(value: string, args?: any): string {
    console.log(value);
    switch (value) {
      case 'isEvent':
        return 'Handelt der Text von einem Event?';
      case 'isMusic':
        return 'Geht es bei dem Text um Musik?';
      case 'isMovie':
        return 'Geht es bei dem Text um Filme?';
    }
    return '';
  }
}
