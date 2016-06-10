import {Injectable} from '@angular/core';
import {DataProvider} from '../common/data-provider';


@Injectable()
export class GeneralProvider {
  constructor(private provider: DataProvider) {}

  getAllNews(force: boolean = false) {
    return this.provider.getAll('news', force);
  }

  getNewsById(id: string, force: boolean = false) {
    return this.provider.getById('news', id, force);
  }

  getAllEvents(force: boolean = false) {
    return this.provider.getAll('events', force);
  }

  getEventsById(id: string, force: boolean = false) {
    return this.provider.getById('events', id, force);
  }

  getAllAnimals(force: boolean = false) {
    return this.provider.getAll('animals', force);
  }

  getAnimalsById(id: string, force: boolean = false) {
    return this.provider.getById('animals', id, force);
  }

  flushCache() {
    this.provider.flushCache();
  }
}
