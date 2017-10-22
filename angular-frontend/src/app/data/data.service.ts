import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  	constructor(private http: Http) { }

  	headers = new Headers({
  	  	'Content-Type': 'application/json'
	});

  	getDoctorsNearby(lat: string, long: string) {
  		let radius = 50;
  		let url = "https://api.betterdoctor.com/2016-03-01/doctors?location=" + lat + "%2C" + long + "%2C" + radius + "&user_location=" + lat + "%2C" + long + "&sort=full-name-asc&skip=0&limit=10&user_key=7c8a24473192660f9cd0fe43b6791bed";
    	return this.http.get(url).map((response:Response) => response.json());
  	}

  	getSearchResultDoctors(query: string, lat: string, long: string) {
  		let limit = 99;
  		let radius = 50;
  		// let url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + query +"&location=" + lat + "%2C" + long + "%2C" + radius + "&user_key=054951f7e3debf472f150c5c85a2d379";
    	let url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + query +"&location=" + lat + "%2C" + long + "%2C" + radius + "&user_location=" + lat + "%2C" + long + "&limit=" + limit + "&user_key=054951f7e3debf472f150c5c85a2d379";
    	return this.http.get(url).map((response:Response) => response.json());
  	}

  	getSearchResultPractices(query: string, lat: string, long: string) {
  		let limit = 99;
  		let radius = 50;
  		let url = "https://api.betterdoctor.com/2016-03-01/practices?name=" + query +"&location=" + lat + "%2C" + long + "%2C" + radius + "&user_location=" + lat + "%2C" + long + "&limit=" + limit + "&user_key=054951f7e3debf472f150c5c85a2d379";
  		return this.http.get(url).map((response:Response) => response.json());
  	}

  	getExample() {
  		return this.http.get(`https://conduit.productionready.io/api/profiles/eric`).map((response:Response) => response.json());
  	}

    sentimentAnalysis(text: string){
      let body = '{"text": "'+ text +'","features":{"sentiment":{}}}';
      let url = 'https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27';
      console.log(body);
      return this.http.post(url,body, "{headers:{'Content-Type': 'application/json'}}").map((response:Response) => response.json());
    }

}
