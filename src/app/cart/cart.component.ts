import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {Computer} from "../model/computer";
import {ComputerService} from "../service/computer.service";
import {Order} from "../model/order";
import {OrderStatus} from "../model/order-status";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentUser: User | undefined;
  computerImages: Map<Computer, any[]> = new Map<Computer, any[]>();
  allOrderStatus = OrderStatus;

  constructor(private authenticationService: AuthenticationService,
              private computerService: ComputerService) {

  }

  ngOnInit(): void {
    this.authenticationService.findUserInfo()
      .subscribe(user => {
        this.currentUser = user;
        this.currentUser?.orders.forEach(order => {
          this.computerService.downloadComputerImages(order.computer)
            .subscribe(images => {
              images = images.map(image => 'data:image/jpeg;base64,' + image.picByte);
              this.computerImages.set(order.computer, images);
              console.log('images are being loaded')
            })
        })
      });
  }
}
