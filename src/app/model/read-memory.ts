import {ReadMemoryType} from "./read-memory-type";

export interface ReadMemory {
  id: number,
  volume: number,
  type: ReadMemoryType,
  price: number
}
