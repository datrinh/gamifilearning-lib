import { Pipe, PipeTransform } from '@angular/core';

/**
 * Very quick and dirty solution to "translate" Ids from backend
 * Angular i18n currently can't translate variables
 * ngx-translate would add another dependency
 */
@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    console.log(value);
    switch (value) {
      case 'isEvent':
        return 'Handelt der Text von einem <b>Event</b>?';
      case 'isMusic':
        return 'Geht es bei dem Text um <b>Musik</b>?';
      case 'isMovie':
        return 'Geht es bei dem Text um <b>Filme</b>?';
      case 'yes':
        return 'Ja';
      case 'no':
        return 'Nein';
      case 'maybe':
        return 'Unklar';
    }
    return '';
  }
}
