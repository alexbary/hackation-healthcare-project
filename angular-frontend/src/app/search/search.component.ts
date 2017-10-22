import { Component, OnInit } from '@angular/core'; 
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../data/data.service";
// import { MatTabsModule } from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	public map: any;
	public google: any;
    public data: any;
    public geolocationPosition: any;
    public loading;

    model: any = {};

  	constructor(public ds: DataService) { }

  	ngOnInit() {
        this.getCurrentLocation();
        this.initMap();
        this.initialSearchDoctors();
        this.watsonSentimentAnalysis("Hello, I think this application is awesome!");
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
            alert(JSON.stringify(this.data)); 
            this.loading = false;
        });
    }

    searchDoctors(query: string, lat: string, long: string) {
        return this.ds.getSearchResultDoctors(query, lat, long).subscribe(response => { 
            this.data = response; 
            alert("results from searching doctors: " + JSON.stringify(this.data)); 
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

    // ngAfterViewInit() {
    //     this.initialGet();
    // }
}
