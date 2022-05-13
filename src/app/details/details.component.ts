import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Computer} from "../model/computer";
import {ComputerService} from "../service/computer.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Review} from "../model/review";
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {Order} from "../model/order";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  computer: Computer | undefined;
  images: any[] = [];
  reviewForm = this.formBuilder.group({
    title: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required),
    score: new FormControl(null, Validators.required)
  });
  private currentUser: User | undefined;

  constructor(private route: ActivatedRoute,
              private computerService: ComputerService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.authenticationService.findUserInfo()
      .subscribe(user => {
        this.currentUser = user;
      })
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
    const days = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  }

  defineReviewStyle(score: number): string {
    switch (score) {
      case 1 :
        return 'danger';
      case 2 :
        return 'secondary';
      case 3 :
        return 'primary';
      case 4 :
        return 'success';
      case 5 :
        return 'warning';
      default:
        return '';
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
    this.authenticationService.findUserInfo()
      .subscribe(user => {
        const newReview = {} as Review;
        newReview.user = user;
        newReview.title = this.reviewForm.value.title;
        newReview.comment = this.reviewForm.value.comment;
        newReview.score = this.reviewForm.value.score;
        newReview.date = new Date(Date.now());
        if (this.computer) {
          this.computerService.postReview(this.computer, newReview)
            .subscribe(computer => {
              console.log(computer);
              this.computer = computer;
            });
        }
      });
  }

  addToCart() {
    if (this.computer && this.currentUser) {
      const newOrder: Order = {computer: this.computer};
      this.userService.addUserOrder(this.currentUser, newOrder)
        .subscribe(user => {
          this.currentUser = user;
          console.log(`order was added to users ${this.currentUser.username}`);
        })
    }
  }
}
