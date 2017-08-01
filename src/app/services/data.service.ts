import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class DataService {

 constructor (private http: Http) {}

getData():Observable<any>{    
       return this.http.get('http://127.0.0.1:8000/chartData/').map((response:Response) => {        
           console.log(response.json());
        return response.json();
    });
    } 
}

