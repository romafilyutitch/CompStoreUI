import {GraphicsUnitType} from "./graphics-unit-type";
import {RandomAccessMemoryType} from "./random-access-memory-type";
import {ReadMemoryType} from "./read-memory-type";

export interface Computer {
  id:number,
  name:string,
  year:number,
  price:number,
  brand:string,
  operationSystem:string,
  graphicsUnitType:GraphicsUnitType,
  graphicsUnitBrand:string,
  graphicsUnitModel:string,
  processorBrand:string,
  processorSeries:string,
  processorCoresAmount:number,
  processorFrequency:number,
  randomAccessMemoryVolume:number,
  randomAccessMemoryType:RandomAccessMemoryType,
  randomAccessMemoryFrequency:number,
  readMemoryVolume:number,
  readMemoryType:ReadMemoryType
}
