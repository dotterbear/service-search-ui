import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    all() {
      return this.http.get('/all').pipe(map((res: any) => res.json()));
    }

}
