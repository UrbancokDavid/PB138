import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserSettings {
  keys = {
    language: 'language'
  };
  language: string;
  defaultLanguage = 'en';
  storage = new Storage(LocalStorage);

  constructor(private events: Events) {}

  setLanguage(language: string) {
    this.storage.set(this.keys.language, language);
    this.events.publish('language:change', language);
  }

  getLanguage() {
    return this.storage.get(this.keys.language).then(value => {
      if (value)
        return value;
      return this.defaultLanguage;
    });
  }
}
