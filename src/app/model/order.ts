import {Computer} from "./computer";
import {OrderStatus} from "./order-status";

export interface Order {
  id?: number,
  status: OrderStatus,
  computer: Computer
}
