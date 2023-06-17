import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoalConf, Page, PageRequest} from "./coal-conf.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpendService {
  // baseUrl = '/coal-server/api/expends';
  baseUrl = '/api/expends';
  constructor(private http: HttpClient) { }

  save(expend: Expend){
    const url = `${this.baseUrl}/save`;
    return this.http.get(url, {params: {expend: JSON.stringify(expend)}});
  }

  delete(id: number | undefined){
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.get(url);
  }

  getAll(writer: string, start: number, end: number, pageRequest: PageRequest){
    const url = `${this.baseUrl}/condition`;
    const param: any = {
      writer,
      start,
      end,
      page: pageRequest.page,
      size: pageRequest.size,
      sort: pageRequest.sort
    };
    return this.http.get(url, {
      responseType: 'json',
      observe: 'response',
      params: param
    }).pipe(
      map((res) => {
        return {total: Number(res.headers.get('x-total-count')), data: res.body} as Page<CoalConf>;
      })
    );
  }
}

export class Expend{

  id?: number;
  payTime?: number;
  amount?: number;
  direction?: string;
  payWay?: string;
  writer?: string;
  createdDate?: number;
}
