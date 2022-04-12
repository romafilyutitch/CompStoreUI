import {GraphicsUnitType} from "./graphics-unit-type";
import {RandomAccessMemoryType} from "./random-access-memory-type";
import {ReadMemoryType} from "./read-memory-type";
import {ComputerPurpose} from "./computer-purpose";
import {GraphicsUnit} from "./graphics-unit";
import {Processor} from "./processor";
import {RandomAccessMemory} from "./random-access-memory";
import {ReadMemory} from "./read-memory";
import {Review} from "./review";

export interface Computer {
  id:number,
  purpose: ComputerPurpose,
  brand: string,
  name: string,
  year: number,
  operationSystem: string,
  price: number,
  graphicsUnit: GraphicsUnit,
  processor: Processor,
  randomAccessMemory: RandomAccessMemory,
  readMemory: ReadMemory,
  reviews: Review[]
}
