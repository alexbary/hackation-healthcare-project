import { Component, OnInit } from '@angular/core'; 
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../data/data.service";
import { PipeTransform, Pipe } from '@angular/core';
// import {Index} from './index';
// import {KeysPipe} from './pipe.ts'
// import { MatTabsModule } from '@angular/material';

declare var google: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit  {

	public map: any;
	public google: any;
    public data: any;
    public geolocationPosition: any;
    public loading;
    public rdata;
    public indexes:Array<string>=[];

    model: any = {};

  	constructor(public ds: DataService) { }

  	ngOnInit() {
        this.getCurrentLocation();
        this.initMap();
        this.initialSearchDoctors();
        // this.watsonSentimentAnalysis("Hello, I think this application is awesome!");
        // this.searchDoctors();
  	}

  	public initMap(): void {
        var mapCanvas = document.getElementById("map");
        var marker = new google.maps.Marker();
        var myCenter = new google.maps.LatLng(0,0);
        var mapOptions = {
            center: myCenter,
            zoom: 10
        }
        // this.map = new google.maps.Map(mapCanvas, mapOptions);
        let lat = localStorage.getItem('latitude');
        let long = localStorage.getItem('longitude');
		var mapOptions = {
		    // center: new google.maps.LatLng(company.markers[0].lat,company.markers[0].lng),
		    // center: new google.maps.LatLng("42","-93.6"),
            center: new google.maps.LatLng(lat, long),
		    zoom: 10
		}
		 
		this.map = new google.maps.Map(mapCanvas, mapOptions);

	    this.map.addListener('click', (event) => {
            alert('Latitudine: ' + event.latLng.lat() + '\nLongitudine: ' + event.latLng.lng());
        });

	    // parse through doctors response
        //
        // this.calService.getCalendar().then((response: any) => {
        //     let company: CalCompanies = null;
        //     let companies = response.json();
        //     companies.forEach(element => {
        //        if(element.name_company === this.calendarName) {
        //            company = element;
        //            return false;
        //        }
        //     });

        //     company.markers.forEach(el => {
        //         if(el !== undefined) {
        //             marker = new google.maps.Marker({
        //                 position: new google.maps.LatLng(el.lat,el.lng),
        //                 map: this.map,
        //                 title: el.description,
        //                 animation: google.maps.Animation.BOUNCE
        //             });
        //             google.maps.event.addListener(marker, 'click', (function(marker) {
        //                 var infowindow = new google.maps.InfoWindow();
        //                 return function() {
        //                     infowindow.setContent(el.description);
        //                     infowindow.open(this.map, marker);
        //                 }
        //             })(marker));
        //         }
        //     });
        //     marker.setMap(this.map);
        // })
    }

    initialSearchDoctors() {
        let lat = localStorage.getItem('latitude');
        let long = localStorage.getItem('longitude');

        return this.ds.getDoctorsNearby(lat, long).subscribe(response => {
            this.loading = true; 
            this.data = response; 
            // alert(JSON.stringify(this.data)); 

            this.loading = false;
        });
    }

    searchDoctors(query: string) {
        let lat = localStorage.getItem('latitude');
        let long = localStorage.getItem('longitude');
        var array_name_first = new Array();
        var array_name_second = new Array();

        return this.ds.getSearchResultDoctors(query, lat, long).subscribe(response => { 
            this.loading = true; 

            this.rdata = response;
            for (var a in response) {
                console.log("loop 1 is working: " + a);
                for (var b in response[a]) {
                    console.log(" loop 2 is working: " + b);
                    for (var c in response[a][b]) {
                        if (c == "profile") {
                            console.log("  loop 3 profiles is working: " + c);
                            for (var d in response[a][b][c]) {
                                console.log("   loop 4 is working: " + d);
                            }                            
                        }
                        if (c == "specialties") {
                            console.log("  loop 3 specialties is working: " + c);
                            for (var d in response[a][b][c]) {
                                console.log("   loop 4 is working: " + d);
                            }                            
                        }
                        if (c == "practices") {
                            console.log("  loop 3 practices is working: " + c);
                            for (var d in response[a][b][c]) {
                                console.log("   loop 4 is working: " + d);
                                for (var e in response[a][b][c][d]) {
                                    // console.log("   loop 5 is working: " + d);
                                }
                            }   
                        }
                        
                        // console.log("  profile: " + c[profile]);
                    }
                }
            }

            // alert("results from searching doctors: " + this.rdata);

            // this.indexes = response;
            // this.indexes = JSON.parse(response);
            // alert(JSON.stringify(this.indexes));
            alert("results from searching doctors: " + JSON.stringify(this.rdata));
            // console.log(this.rdata);
            // let at_i;
            // while (this.rdata.data[at_i]) {
            //     console.log(this.rdata.data[at_i].profile.first_name); 
            //     console.log(this.rdata.data[at_i].profile.middle_name);
            //     console.log(this.rdata.data[at_i].profile.last_name); 
            //     console.log(this.rdata.data[at_i].profile.bio);
            //     at_i++;
            // }

            // var idss = [];
            // for(let result of response){
            //     console.log("printing something");
            //     console.log(result);
            //    // idss.push(result.data[1].profile.first_name);
            // }
            // alert("idss: " + idss[0]);
            // alert("length: " + this.rdata.data);
            // alert(this.rdata.data[1].profile.first_name);

            // console.log(this.rdata.data[1].profile);
            // console.log(this.rdata.data[1].profile.first_name); 
            // console.log(this.rdata.data[1].profile.middle_name);
            // console.log(this.rdata.data[1].profile.last_name); 
            // console.log(this.rdata.data[1].profile.bio); 
            this.loading = false; 
        });
    }

    searchPractices(query: string, lat: string, long: string) {
        return this.ds.getSearchResultPractices(query, lat, long).subscribe(response => { 
            this.data = response; 
            alert("results from searching practices: " + JSON.stringify(this.data)); 
        });
    }

    watsonSentimentAnalysis(text: string) {
        return this.ds.sentimentAnalysis(text).subscribe(response => { 
            this.data = response; 
            alert("results from searching practices: " + JSON.stringify(this.data)); 
        });
    }

    zoomIn() {
        this.map.setZoom(this.map.getZoom() + 1);
    }
    
    zoomOut() {
        this.map.setZoom(this.map.getZoom() - 1);
    }

    getCurrentLocation() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position);
                    this.geolocationPosition = position;
                    let lat = position.coords.latitude.toString();
                    let lon = position.coords.longitude.toString();
                    localStorage.setItem("latitude", lat);
                    localStorage.setItem("longitude", lon);
                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                }
            );
            // window.navigator.geolocation.getCurrentPosition(position => {this.geolocationPosition = position; console.log(this.geolocationPosition); alert(this.geolocationPosition.coords.latitude);});
            // let position = window.navigator.geolocation.getCurrentPosition;
            // alert(r.coords.latitude);
            // this.geolocationPosition = position;
            // alert(this.geolocationPosition.coords.latitude);
            // (position => {this.geolocationPosition = position; console.log(this.geolocationPosition); alert(this.geolocationPosition.coords.latitude);});  
        };
        // return window.navigator.geolocation.getCurrentPosition(position => {this.geolocationPosition = position;});
    }

    // transform(value, args:string[]) : any {
    //     let rdata = [];
    //     for (let key in value) {
    //         // rdata.push({key: key, value: value[key]});
    //         rdata.push(key);
    //     }
    //     return rdata;
    // }

    // ngAfterViewInit() {
    //     this.initialGet();
    // }
}

// @Pipe({name: 'keys'})
// export class KeysPipe implements PipeTransform {
//     transform(value, args:string[]) : any {
//         let keys = [];
//         for (let key in value) {
//             keys.push({key: key, value: value[key]});
//         }
//         return keys;
//     }
// }