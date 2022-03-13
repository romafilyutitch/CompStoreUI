import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  computers: object[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAll('/api/computers')
      .subscribe(response => {
        console.log(response._embedded.computers)
      });
  }

}
