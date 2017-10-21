import { Component, OnInit } from '@angular/core'; 
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatTabsModule } from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	private map: any;
	public google: any;

  	constructor() { }

  	ngOnInit() {
  		this.initMap();
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

		var mapOptions = {
		    // center: new google.maps.LatLng(company.markers[0].lat,company.markers[0].lng),
		    center: new google.maps.LatLng("42","-93.6"),
		    zoom: 10
		}
		 
		this.map = new google.maps.Map(mapCanvas, mapOptions);

	    this.map.addListener('click', (event) => {
            alert('Latitudine: ' + event.latLng.lat() + '\nLongitudine: ' + event.latLng.lng());
        });

	    // parse through doctors response
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

    zoomIn() {
        this.map.setZoom(this.map.getZoom() + 1);
    }
    
    zoomOut() {
        this.map.setZoom(this.map.getZoom() - 1);
    }
}
