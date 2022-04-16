import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ComputerService} from "../service/computer.service";
import {Computer} from "../model/computer";
import {GraphicsUnit} from "../model/graphics-unit";
import {Processor} from "../model/processor";
import {RandomAccessMemory} from "../model/random-access-memory";
import {ReadMemory} from "../model/read-memory";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  selectedFile: File | undefined;
  filesToUpload: File[] = [];
  previewFile: File | undefined;
  previewFiles: File[] = [];

  @ViewChild('fileInput')
  fileInput: ElementRef | undefined;
  @ViewChild('content')
  content: TemplateRef<any> | undefined;

  form = this.formBuilder.group({
    price: '',
    computerBrand: '',
    computerName: '',
    operationSystem: '',
    year: '',
    purpose: '',
    GUBrand: '',
    GUType: '',
    GUModel: '',
    processorBrand: '',
    processorSeries: '',
    processorCores: '',
    processorFrequency: '',
    RAMVolume: '',
    RAMType: '',
    RAMFrequency: '',
    readMemoryVolume: '',
    readMemoryType: ''
  })

  constructor(private formBuilder: FormBuilder,
              private computerService: ComputerService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  preview(event: any): void {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (event: any) => {
        this.previewFile = event.target.result
      }
    }
  }

  addPreviewImageToUpload(): void {
    if (this.selectedFile && this.previewFile) {
      this.filesToUpload.push(this.selectedFile);
      this.previewFiles.push(this.previewFile);
    }
    if (this.fileInput !== undefined) {
      this.fileInput.nativeElement.value = "";
    }
    this.selectedFile = undefined;
    this.previewFile = undefined;
  }

  clearUpload(): void {
    this.filesToUpload.length = 0;
    this.previewFiles.length = 0;
  }

  onSubmit() {
    const computerToSave: Computer = this.buildComputer();
    this.computerService.add(computerToSave).subscribe(response => {
      this.filesToUpload.forEach(image => {
        this.computerService.uploadImage(response, image).subscribe(() => {
            console.log(`image ${image} was saved`);
          },
          () => {
            console.log(`image ${image} wasn't saved`);
          });
      });
      this.modalService.open(this.content, {centered:true});
    });

    this.form.reset();
  }

  private buildComputer(): Computer {
    //building computer
    const computerToSave: Computer = {} as Computer;
    computerToSave.name = this.form.value.computerName;
    computerToSave.brand = this.form.value.computerBrand;
    computerToSave.year = this.form.value.year;
    computerToSave.price = this.form.value.price;
    computerToSave.operationSystem = this.form.value.operationSystem;
    computerToSave.purpose = this.form.value.purpose;

    //building GU
    const computerGU: GraphicsUnit = {} as GraphicsUnit;
    computerGU.brand = this.form.value.GUBrand;
    computerGU.model = this.form.value.GUModel;
    computerGU.type = this.form.value.GUType;
    computerToSave.graphicsUnit = computerGU;

    //building Processor
    const processor: Processor = {} as Processor;
    processor.brand = this.form.value.processorBrand;
    processor.series = this.form.value.processorSeries;
    processor.coresAmount = this.form.value.processorCores;
    processor.frequency = this.form.value.processorFrequency;
    computerToSave.processor = processor;

    //building RAM
    const RAM: RandomAccessMemory = {} as RandomAccessMemory;
    RAM.type = this.form.value.RAMType;
    RAM.frequency = this.form.value.RAMFrequency;
    RAM.volume = this.form.value.RAMVolume;
    computerToSave.randomAccessMemory = RAM;

    //building ReadMemory
    const readMemory: ReadMemory = {} as ReadMemory;
    readMemory.type = this.form.value.readMemoryType;
    readMemory.volume = this.form.value.readMemoryVolume;
    computerToSave.readMemory = readMemory;

    return computerToSave;
  }
}
