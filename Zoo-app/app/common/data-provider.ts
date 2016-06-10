import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Settings} from './settings';


@Injectable()
export class DataProvider {

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
}
