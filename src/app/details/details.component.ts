import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from "@angular/router";
import {Computer} from "../model/computer";
import {ComputerService} from "../service/computer.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Review} from "../model/review";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  computer: Computer | undefined;
  images: any[] = [];
  reviewForm = this.formBuilder.group({
    comment: new FormControl(null, Validators.required),
    score: new FormControl(null, Validators.required)
  });

  constructor(private route: ActivatedRoute,
              private computerService: ComputerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    this.computerService.findById(productIdFromRoute)
      .subscribe(response => {
        this.computer = response;
        console.log(this.computer);
        this.computerService.downloadComputerImages(this.computer).subscribe(response => {
          this.images = response.map(image => 'data:image/jpeg;base64,' + image.picByte);
          console.log(this.images);
        })
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
    console.log(this.computer?.reviews);
    if (this.computer?.reviews) {
      this.computer.reviews.forEach(review => {
        reviewsSum += Number(review.score);
        console.log(reviewsSum);
      });
      return reviewsSum / this.computer.reviews.length;
    }
    return reviewsSum;
  }

  addReview() {
    const newReview = {} as Review;
    newReview.comment = this.reviewForm.value.comment;
    newReview.score = this.reviewForm.value.score;
    newReview.date = new Date(Date.now());
    console.log(newReview.date);
    //@TODO add user here
    this.computer?.reviews.push(newReview);
    if (this.computer && this.reviewForm.valid) {
      this.computerService.update(this.computer.id, this.computer).subscribe(computer => {
        this.computer = computer;
      })
    }
  }
}
