import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  	constructor(private http: Http) { }

  	getDoctorsNearby(userLocation: string, radius: string) {
  		let url = "https://api.betterdoctor.com/2016-03-01/doctors?location="+ userLocation + "%2C" + radius +"&user_location=" + userLocation +"&sort=full-name-asc&skip=0&limit=10&user_key=7c8a24473192660f9cd0fe43b6791bed";
    	return this.http.get(url).map((response:Response) => response.json());
  	}

  	getSearchResultDoctors(query: string, lat: string, long: string) {
  		let radius = 50;
  		let url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + query +"&location=" + lat + "%2C" + long + "%2C" + radius + "&user_key=054951f7e3debf472f150c5c85a2d379";
    	return this.http.get(url).map((response:Response) => response.json());
  	}

  	getSearchResultPractices() {

  	}

  	getExample() {
  		return this.http.get(`https://conduit.productionready.io/api/profiles/eric`).map((response:Response) => response.json());
  	}


}
