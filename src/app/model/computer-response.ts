import {Computer} from "./computer";

export interface ComputerResponse {
  _embedded:{
    computers: Computer[]
  }
  page: {
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
