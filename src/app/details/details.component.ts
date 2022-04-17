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

  calculateDays(date: Date): string {
    let currentDate = new Date();
    let startDate = new Date(date);
    const days =  Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) /(1000 * 60 * 60 * 24));
    return `${days} days ago`;
  }

  defineReviewStyle(score: number): string {
    switch (score) {
      case 1 : return 'danger';
      case 2 : return 'secondary';
      case 3 : return 'primary';
      case 4 : return 'success';
      case 5 : return 'warning';
      default: return '';
    }
  }

  averageScore() {
    let reviewsSum: number = 0;
    if (this.computer?.reviews) {
      this.computer.reviews.forEach(review => {
        reviewsSum += review.score;
      });
      return reviewsSum / this.computer.reviews.length;
    }
    return reviewsSum;
  }
}
