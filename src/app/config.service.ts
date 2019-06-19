import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  public static get disableLogging(): boolean { return ConfigService._disableLogging; }
  public static get urlOData(): string { return ConfigService._urlOData; }
  public static get urlApi(): string { return ConfigService._urlApi; }

  constructor(private http: HttpClient) { }

  protected static _disableLogging = true;
  protected static _urlOData = '';
  protected static _urlApi = '';

  load(): Promise<any> {

    // https://stackoverflow.com/questions/47206924/angular-5-service-to-read-local-json-file
    const ret = this.http.get('./assets/config.json')
      .toPromise()
      .then(
        res => {
          const obj: any = res;
          // https://www.codementor.io/brijmcq/angular-clear-all-of-your-console-logs-in-production-build-with-just-a-few-lines-of-code-cxcw30yqs
          if (obj.disableLogging) {
            window.console.log = () => { };
            window.console.group = () => { };

            console.log = () => { };
            console.group = () => { };
          }

          console.log('Content of config.json', res);

          ConfigService._disableLogging = obj.disableLogging;
          ConfigService._urlOData = obj.urlOData;
          ConfigService._urlApi = obj.urlApi;

          console.log('Intialized from config.json', this);
        },
        err => {
          console.log(err);
        }
      );

    return ret.then((x) => {
      console.log('ConfigService intialized');
    }
    );
  }

}
