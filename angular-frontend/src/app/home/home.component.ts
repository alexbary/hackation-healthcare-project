import { Component, OnInit } from '@angular/core';
import { DataService } from "../data/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public data;
  	constructor(public ds: DataService) { }

  	ngOnInit() {
  		
  	}

  	testGetRequest(query: string, lat: string, long: string) {
  		return this.ds.getSearchResultPractices(query, lat, long).subscribe(response => { 
            this.data = response; 
        });
  	}
}
