import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from "@angular/router";
import {Computer} from "../model/computer";
import {ComputerService} from "../service/computer.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  computer: Computer | undefined;

  constructor(private route: ActivatedRoute,
              private computerService: ComputerService) { }

  ngOnInit(): void {
    //First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    console.log(productIdFromRoute);
    //Find the product that correspond with the id provided in route.
    this.computerService.findById(productIdFromRoute)
      .subscribe(response => {
        this.computer = response;
        console.log(this.computer);
      });
  }

}
