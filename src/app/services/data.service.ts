import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class DataService {

 constructor (private http: Http) {}

getData(aggr):Observable<any>{    
       let variables = JSON.stringify(aggr); 
       return this.http.get('http://127.0.0.1:8000/custom/get/?variables='+variables).map((response:Response) => {        
        return response.json();
    });
    } 
}

