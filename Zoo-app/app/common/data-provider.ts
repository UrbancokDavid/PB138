import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Settings} from './settings';


@Injectable()
export class DataProvider {
  cache = {};

  constructor(private http: Http) {}

  get(request: string) {
    var host: string = Settings.host + ':' + String(Settings.host_port) + '/';
    return new Promise((resolve, reject) => {
      this.http.get(host + request).subscribe(
        res => {
          var data = res.json();
          console.log(data);
          resolve(data);
        },
        error => {
          reject(error);
        }
      )
    });
  }

  load(type: string, force: boolean = false) {
    if (!force && this.cache[type]) {
      return Promise.resolve(this.cache[type]['list']);
    }
    return this.get(type);
  }

  getAll(type: string, force: boolean = false) {
    return this.load(type, force).then((data: any) => {
      this.cache[type] = {};
      this.cache[type]['list'] = data;
      var map = {};
      data.forEach(item => {
        map[item['id']] = item;
      });
      this.cache[type]['map'] = map;
      return this.cache[type]['list'];
    });
  }

  getById(type: string, id: string, force: boolean = false) {
    if (!force && this.cache[type] && (id in this.cache[type]['map'])) {
      return Promise.resolve(this.cache[type]['map'][id]);
    }

    this.get(type + '/' + id).then(data => {
      if (!this.cache[type]) {
        this.cache[type] = {};
        this.cache[type]['list'] = [];
        this.cache[type]['map'] = {};
      }
      this.cache[type]['list'].push(data);
      this.cache[type]['map'][data['id']] = data;
      return data;
    });
  }

  flushCache() {
    this.cache = {};
  }
}
