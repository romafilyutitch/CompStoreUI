import {GraphicsUnitType} from "./graphics-unit-type";

export interface GraphicsUnit {
  id: number,
  type: GraphicsUnitType,
  brand: string,
  model: string,
  price: number
}
