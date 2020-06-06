import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

export abstract class BaseRestService<T> extends BaseService {
    constructor(protected http: HttpClient, endpointName: string) {
        super(http, endpointName);
    }

    public listPaginate(page?, search?): Observable<any> {
        let options = this.getHttpHeaders();
        options.params = new HttpParams();
        if (page) {
            options.params = options.params.set("page", page.pageIndex + 1);
            options.params = options.params.set("size", page.pageSize);
        } else {
            options.params = options.params.set("page", 0);
            options.params = options.params.set("size", 5);
        }

        if (search) {
            options.params = options.params.set("search", search);
        }
        return this.http.get(this.actionUrl + "page", options);
    }

    public listAll(search?, page?): Observable<any> {
        let options = this.getHttpHeaders();
        options.params = new HttpParams();
        if (search) {
            if (page) {
                options.params = options.params.set("page", page.pageIndex + 1);
                options.params = options.params.set("size", page.pageSize);
            }
            options.params = options.params.set("search", search);
            return this.http.get<T[]>(this.actionUrl, options);
        }
        return this.http.get<T[]>(this.actionUrl);
    }

    public getById(id: number): Observable<T> {
        return this.http.get<T>(this.actionUrl + id);
    }

    public add(item: T): Observable<T> {
        return this.http.post<T>(this.actionUrl, item);
    }

    public update(item: T): Observable<T> {
        return this.http.put<T>(this.actionUrl, item);
    }

    public delete(id: number): Observable<T> {
        return this.http.delete<T>(this.actionUrl + id);
    }
}
