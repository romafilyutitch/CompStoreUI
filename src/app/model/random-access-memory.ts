import {RandomAccessMemoryType} from "./random-access-memory-type";

export interface RandomAccessMemory {
  id:number,
  volume: number,
  type: RandomAccessMemoryType,
  frequency: number,
  price: number
}
