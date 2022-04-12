import {UserRole} from "./user-role";
import {Order} from "./order";

export interface User {
  id: number,
  username: string,
  email: string,
  password: string,
  userRole: UserRole,
  orders: Order[]
}
