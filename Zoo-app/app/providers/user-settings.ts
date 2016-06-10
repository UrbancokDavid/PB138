import {Injectable} from '@angular/core';
import {Language} from '../common/languages'
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserSettings {
  keys = {
    language: 'language'
  };
  language: Language = Language.English;
  storage = new Storage(LocalStorage);

  constructor(private events: Events) {}

  setLanguage(language: Language) {
    this.storage.set(this.keys.language, language);
    this.events.publish('language:change');
  }

  getLanguage() {
    return this.storage.get(this.keys.language).then(value => {
      return value;
    });
  }
}
