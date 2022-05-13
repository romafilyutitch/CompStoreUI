import {Component, OnInit} from '@angular/core';
import {Computer} from "../model/computer";
import {ComputerService} from "../service/computer.service";
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {first} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  computers: Computer[] = [];
  computerImages: Map<Computer, any[]> = new Map<Computer, any[]>();
  currentUser: User | undefined;

  constructor(private computerService: ComputerService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.computerService.findAll()
      .subscribe(response => {
        this.computers = response;
        this.downloadImages();
      });
    if(this.authenticationService.isUserLoggedIn()) {
      this.authenticationService.findUserInfo()
        .subscribe(user => {
          this.currentUser = user;
          console.log(this.currentUser);
        })
    }
  }

  private downloadImages() {
    this.computers.forEach(computer => {
      this.computerService.downloadComputerImages(computer).subscribe(images => {
        images = images.map(image => 'data:image/jpeg;base64,' + image.picByte);
        this.computerImages.set(computer, images);
        console.log(this.computerImages);
      })
    });
  }

  findByName(name: string): void {
    this.computerService.findByName(name)
      .subscribe(computers => {
        this.computers = computers;
        this.downloadImages();
      })
  }

  sortByName() {
    this.computers = this.computers.sort((a:Computer, b:Computer) => {
      return a.name.localeCompare(b.name);
    });

  }

  sortByYear() {
    this.computers = this.computers.sort((a: Computer, b: Computer) => {
      return a.year - b.year;
    });
  }

  sortByPrice() {
    this.computers = this.computers.sort((a: Computer, b: Computer) => {
      return a.price - b.price;
    });
  }

  findInPriceRange(priceStart: string, priceEnd: string) {
    this.computerService.findAll()
      .subscribe(computers => {
      this.computers = computers.filter(computer => {
          return computer.price >= Number(priceStart) && computer.price <= Number(priceEnd);
        });
      this.downloadImages();
      })
  }

  findTopMostOrdered(number: number) {

  }

  findTopAverageReview(number: number) {
    this.computerService.findTopAverageReview()
      .subscribe(computers => {
        this.computers = computers;
        this.downloadImages();
      });
  }
}
