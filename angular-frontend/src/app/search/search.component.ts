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
            // this.loading = true; 
            this.data = response; 
            // alert(JSON.stringify(this.data)); 

            // this.loading = false;
        });
    }

    searchDoctors(query: string) {
        let lat = localStorage.getItem('latitude');
        let long = localStorage.getItem('longitude');
        var data_array = new Array();
        // var array_name_second = new Array();

        return this.ds.getSearchResultDoctors(query, lat, long).subscribe(response => { 
            this.loading = false; 

            // this.rdata = response;
            for (var a in response) {
                if (a == "data") {
                    console.log("loop 1 is working: " + a);
                    for (var b in response[a]) {
                        console.log(" loop 2 is working: " + b);
                        for (var c in response[a][b]) {
                            if (c == "profile") {
                                let fname;
                                let mname;
                                let lname;
                                let title;
                                let bio;
                                console.log("  loop 3 profiles is working: " + c);
                                for (var d in response[a][b][c]) {                                 
                                    console.log("   loop 4 is working: " + d);
                                    if (d == "middle_name") {
                                        console.log("    loop 5 middle name: " + response[a][b][c][d]);
                                        mname = response[a][b][c][d];
                                    }
                                    if (d == "last_name") {
                                        console.log("    loop 5 last name: " + response[a][b][c][d]);
                                        lname = response[a][b][c][d]; 
                                    }
                                    if (d == "title") {
                                        console.log("    loop 5 title: " + response[a][b][c][d]);
                                        title = response[a][b][c][d];
                                    }
                                    if (d == "first_name") {
                                        console.log("    loop 5 first name: " + response[a][b][c][d]);
                                        fname = response[a][b][c][d]; 
                                    }
                                    if (d == "bio") {
                                        console.log("    loop 5 bio: " + response[a][b][c][d]); 
                                        bio = response[a][b][c][d];
                                    }
                                }
                                let fullname = fname + " " + mname + " " + lname + ", " + title;
                                console.log("FULLNAME: " + fullname);
                                data_array.push({name: fullname, bio: bio, fname: fname, lname: lname});
                                // data_array.push(Array('name': fullname, 'value': bio));                             
                            }
                            if (c == "specialties") {
                                console.log("  loop 3 specialties is working: " + c);
                                for (var d in response[a][b][c]) {
                                    console.log("   loop 4 is working: " + d);
                                    for (var e in response[a][b][c][d]) {
                                        if (e == "uid") {
                                            console.log("    loop 5 UID is working: " + response[a][b][c][d][e]);
                                        }
                                    }
                                }                            
                            }
                            // if (c == "practices") {
                            //     console.log("  loop 3 practices is working: " + c);
                            //     for (var d in response[a][b][c]) {
                            //         console.log("   loop 4 is working: " + d);
                            //         for (var e in response[a][b][c][d]) {
                            //             // console.log("    loop 5 practices: " + response[a][b][c][d][e]);
                            //             // console.log("    loop 5 is working: " + e);
                            //         }
                            //     }   
                            // }
                            
                            // console.log("  profile: " + c[profile]);
                        }
                    }
                }

            }
            this.rdata = data_array;
            // alert(JSON.stringify(data_array));
            console.log(data_array);


            for (var pair in data_array) {

                
                let f;
                let l;
                for (var name in data_array[pair]) {
                    if (name == "fname") {
                        // console.log("RUNTHROUGH: " + data_array[pair][name]);
                        f = data_array[pair][name];
                        // console.log("f: " + f);
                    }
                    if (name == "lname") {
                        l = data_array[pair][name];
                        // console.log("l: " + l);
                    }
                }
                this.ds.findDoctor(f, l).subscribe(response => console.log(response));
            }

            // for (var i = 0; i < data_array.length; i++) {
            //     for (var j = 0; j < data_array[i].length; j++) {
            //         console.log("RUNTHROUGH: " + data_array[i][j]);       
            //     }
            // }

            // alert("results from searching doctors: " + this.rdata);

            // this.indexes = response;
            // this.indexes = JSON.parse(response);
            // alert(JSON.stringify(this.indexes));


            // alert("results from searching doctors: " + JSON.stringify(this.rdata));
            

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
            this.loading = true; 
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

    goToReviews(name: string) {
        alert("Opening: " + name);
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