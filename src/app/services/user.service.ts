import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class UserService {

 constructor (private http: Http) {}

getData():Observable<any>{
    console.log("Here");
       return this.http.get('http://192.168.3.57:9000/api/profile/').map((response:Response) => {        
        return response.json();
    });
    } 
}

