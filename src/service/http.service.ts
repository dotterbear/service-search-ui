import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { retry } from 'rxjs/operators'

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    get<T>(url: string, params) {
      return this.http.get<T>(url, { params: params }).pipe(retry(3));
    }

}
