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
      //this.ds.saveReview('Brad','New','Totally a bitch',-.1);
      // this.ds.findDoctor('Brad','New').subscribe(response => { 
      //       this.data = response; 
      //   });
      // this.ds.sentimentAnalysis('hi this is some random text with no explcitally happy or sad meaning').subscribe(response => { 
      //       this.data = response; 
      //   });
      // this.ds.saveReview('Brad','New','hi this is some random text with no explcitally happy or sad meaning',0.2).subscribe(response => { 
      //       this.data = response; 
      //   });
      // this.testGetRequest("test", "39", "-93");
  		
  	}

  	testGetRequest(query: string, lat: string, long: string) {
  		// change getSearchResultPractices to your data service method
  		return this.ds.getSearchResultPractices(query, lat, long).subscribe(response => { 
            this.data = response; 
            //alert("results: " + JSON.stringify(this.data)); 
        });
  	}
}
