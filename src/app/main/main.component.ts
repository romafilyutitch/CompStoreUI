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
  computerImages: Map<Computer, any[]> = new Map<Computer, any[]>();

  constructor(private computerService: ComputerService) {
  }

  ngOnInit(): void {
    this.computerService.findAll()
      .subscribe(response => {
        this.computers = response;
        this.downloadImages();
      });
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
}
