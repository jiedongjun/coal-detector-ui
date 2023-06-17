import {Injectable} from '@angular/core';
import {map, Observable, of, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";

export class PageRequest {
  page?: number;
  size?: number;
  sort?: string;
}

export class Page<T> {
  pi?: number;
  total?: number;
  data?: T[];
}

@Injectable({
  providedIn: 'root'
})
export class CoalConfService {
  // baseUrl = '/coal-server/api/coal-confs';
  baseUrl = '/api/coal-confs';

  constructor(private http: HttpClient) {
  }

  findAll(start: number, stop: number, payStatus: number, send: string, phone: string, pageParam: PageRequest) {
    const url = `${this.baseUrl}/condition`;
    const param: any = {
      start,
      stop,
      payStatus,
      send,
      phone,
      page: pageParam.page,
      size: pageParam.size,
      sort: pageParam.sort
    };
    return this.http.get(url, {
      responseType: 'json',
      params: param
    });
  }

  save(coalConf: CoalConf): Observable<CoalConf> {
    const url = `${this.baseUrl}/save`;
    return this.http.get<CoalConf>(url, {params: {coalConf: JSON.stringify(coalConf)}});
  }

  findOne(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  deleteOne(id: number) {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.get(url);
  }
}

export class CoalConf {

  id?: number;
  project?: string;
  send?: string = '';
  soft3?: number;
  payStatus?: string = '';
  note1?: string;
  note2?: string;
  coalType?: string;
  phone?: string = '';
  up_M?: number;
  up_M1?: number;
  up_M2?: number;
  up_M3?: number;
  up_M4?: number;
  up_A?: number;
  up_A1?: number;
  up_A2?: number;
  up_A3?: number;
  up_A4?: number;
  up_V?: number;
  up_V1?: number;
  up_V2?: number;
  up_V3?: number;
  up_V4?: number;
  low_m?: number;
  low_m1?: number;
  low_m2?: number;
  low_m3?: number;
  low_m4?: number;
  up_S?: number;
  up_C?: number;
  sc1?: number;
  sc2?: number;
  sc3?: number;
  eggCone1?: number;
  eggCone2?: number;
  eggCone3?: number;
  price1?: number;
  price2?: number;
  report1?: number;
  report2?: number;
  report3?: number;
  created_date?: number;

  up_Aar?: number;
  up_Ad?: number;
  up_Var?: number;
  up_Vd?: number;
  up_Vdaf?: number;
}
