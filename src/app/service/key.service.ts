import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  // baseUrl = '/coal-server/api/key';
  baseUrl = '/api/key';
  public _auth: boolean = false;

  constructor(private http: HttpClient) { }

  update(encode: string, validTime: number){
    const url = `${this.baseUrl}/update_auth`;
    return this.http.get(url, {params: {encode, validTime}});
  }

  get(deEncode: string){
    const url = `${this.baseUrl}/file`;
    return this.http.get(url, {params: {deEncode}, responseType: "arraybuffer"});
  }

  auth(): Observable<any>{
    const url = `${this.baseUrl}/auth`;
    return this.http.get(url);
  }
}
