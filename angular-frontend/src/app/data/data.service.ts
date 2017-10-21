import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  	constructor(private http: Http) { }

  	getDoctorsNearby() {
    	
  	}

  	getSearchResultDoctors() {

  	}

  	getSearchResultPractices() {
  		
  	}

  	getExample() {
  		return this.http.get(`https://conduit.productionready.io/api/profiles/eric`).map((res:Response) => res.json());
  	}


}
