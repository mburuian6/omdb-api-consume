import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
  data: any;
  constructor(home: HomeComponent) { 
    this.data = home.data;
  }

  ngOnInit(): void {
    
  }

}
