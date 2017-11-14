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
  		let radius = 25;
  		let url = "https://api.betterdoctor.com/2016-03-01/doctors?location=" + lat + "%2C" + long + "%2C" + radius + "&user_location=" + lat + "%2C" + long + "&sort=full-name-asc&skip=0&limit=10&user_key=7c8a24473192660f9cd0fe43b6791bed";
    	return this.http.get(url).map((response:Response) => response.json());
  	}

  	getSearchResultDoctors(query: string, lat: string, long: string) {
  		let limit = 99;
  		let radius = 25;
  		// let url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + query +"&location=" + lat + "%2C" + long + "%2C" + radius + "&user_key=054951f7e3debf472f150c5c85a2d379";
    	let url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + query +"&location=" + lat + "%2C" + long + "%2C" + radius + "&user_location=" + lat + "%2C" + long + "&limit=" + limit + "&user_key=054951f7e3debf472f150c5c85a2d379";
    	return this.http.get(url).map((response:Response) => response.json());
  	}

  	getSearchResultPractices(query: string, lat: string, long: string) {
  		let limit = 99;
  		let radius = 25;
  		let url = "https://api.betterdoctor.com/2016-03-01/practices?name=" + query +"&location=" + lat + "%2C" + long + "%2C" + radius + "&user_location=" + lat + "%2C" + long + "&limit=" + limit + "&user_key=054951f7e3debf472f150c5c85a2d379";
  		return this.http.get(url).map((response:Response) => response.json());
  	}

  	getExample() {
  		return this.http.get(`https://conduit.productionready.io/api/profiles/eric`).map((response:Response) => response.json());
  	}

    sentimentAnalysis(text: string){
      let url = "https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze"
      +"?version=2017-02-27&features=sentiment&text=" + text;
      return this.http.get(url).map((response:Response) => response.json());
    }

    findDoctor(fname: string,lname: string){
      let url = 'http://127.0.0.1:8080/find/'+fname+'/'+lname+'/';
      return this.http.get(url).map((response:Response) => response.json());
    }

    saveReview(fname: string,lname: string,text: string,sentiment: number){
      let url = 'http://localhost:8080/review/'+fname+'/'+lname+'/?text='+text+'&sentiment='+sentiment;
      return this.http.get(url).map((response:Response) => response.json());
    }

    calculateRating(doctor) {
      var sum = 0;
      var len = doctor.reviews.length;
      if(len == 0){
        return 5;
      }
      for(var i = 0;i < len; i++){
        sum += doctor.reviews[i].sentimentRaw*6.665+5;
      }
      var avg = Number((sum/len).toFixed(1));
      return this.bound(avg,0.0,10.0);
    }

    bound(num,min,max) {
      if (num<min) {
        return min;
      } else if(num > max) {
        return max;
      } else {
        return num;
      }
    }

}
