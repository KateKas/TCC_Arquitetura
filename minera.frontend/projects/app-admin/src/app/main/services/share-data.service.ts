import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {

    private sharedData = new BehaviorSubject('default message');
    id = this.sharedData.asObservable();

    constructor() { }

    share(data) {
        this.sharedData.next(data)
    }

}