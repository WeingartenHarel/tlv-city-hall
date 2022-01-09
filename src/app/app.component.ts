import { Component } from '@angular/core';
import {  EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';

//locations Modal / interface
export interface Location{
  message?:any;
  iss_position?:any;
  timestamp?:any;
  note?:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'frontend';
  currLocation:any ;
  locations: Location[] = [
    {"message": "success", "iss_position": {"longitude": "55.1859", "latitude": "36.0028"}, "timestamp": 1641751641}
    // added first location for fake data
  ];
  note:string ='';

  // ng on component mount call api
  async ngOnInit() {
    console.log(`OnInit`);
    // await this.getDataFromServer() // for testing the api
    await this.getDataByTime(3000) // calling getDataByTime(with time), serInterval type 
  }

  // calling getDataFromServer by time
  async getDataByTime(time:number){
    (async()=>{
      setInterval(async ()=>{ // use arrow function to fix this.state undefined  
            console.log('calling server')
            await this.getDataFromServer() 
          },time);
      })();
  }
  
  // getting data form api 
  async getDataFromServer(): Promise<void>{
    try {  
      let response = await fetch('http://api.open-notify.org/iss-now.json');  //getting data from api
      const data = await response.json(); // convert data to json
      this.currLocation = data; // assign data to cuurLocation param
      // console.log('this.location',this.currLocation) // logging data
      // return data // commented function void
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
      // return err  // commented function void
    }
  }

  // on click add note function
  addNote(){
    this.currLocation.note = this.note; // assign note property to cuurLocation object
    // console.log('this.location',this.currLocation); // logging cuurLocation after change
    this.locations = [...this.locations,this.currLocation] // update list of locations
  }

  // Nice Assigenment , intersating to work on.
  // waiting for feed back.
  // Respectfully
  // Weingarten Harel
  // harelwn@gmail.com
  // 0506-555525
  // https://github.com/WeingartenHarel
  // https://www.linkedin.com/in/harel-weingarten/
}
