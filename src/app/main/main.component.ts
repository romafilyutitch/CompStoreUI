import {Component, OnInit} from '@angular/core';
import {Computer} from "../model/computer";
import {ComputerService} from "../service/computer.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  computers: Computer[] = [];

  constructor(private computerService: ComputerService) {
  }

  ngOnInit(): void {
    this.computerService.findAll()
      .subscribe(response => {
        console.log(response);
        this.computers = response;
      });
  }

  findByName(name: string): void {
    console.log(name);
    this.computerService.findByName(name)
      .subscribe(response => {
        console.log(response);
        this.computers = response;
      })
  }

}
