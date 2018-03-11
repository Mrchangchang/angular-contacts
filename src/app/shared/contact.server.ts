import { Injectable } from "@angular/core";
import {HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

//const CONTACT_URL = `../../assets/mock-data/contacts.json`;
const CONTACT_URL = 'contact/getContacts';

@Injectable()
export class ContactService {
  constructor(
    private http: HttpClient
  ) {}
  get(url: string, opts?:any) {
    if(opts) {
      var params = new HttpParams();
      Object.keys(opts).forEach((key) => {
        params.set(key,opts[key])
      })
    }
    return this.http.get<any>(url,{params})
      .map(res => {
        let _res = res;
        if (opts && opts.id) {
          for (let i=0; i<_res.length; i++) {
            if (_res[i].id == opts.id) {
              _res = _res[i];
            }
          }
        }
        if (opts && opts.collection) {
          let temp: any = [];
          for (let i=0;i<_res.length;i++) {
            if (_res[i].collection == opts.collection) {
              temp.push(_res[i]);
            }
          }
          _res = temp
        }
        return _res
      })
  }
  getContactsData() {
    return this.get(CONTACT_URL)
  }
  getContactById(id:number) {
    return this.get(CONTACT_URL, {id})
  }
  getCollections() {
    return this.get(CONTACT_URL, {collection: 1})
  }
  addContact(obj: Object = {}) {
    let body = obj;
    let headers = new HttpHeaders().set("content-type", "application/json");
    return this.http.post(CONTACT_URL, body, {
      headers: headers
    })
  }
}
