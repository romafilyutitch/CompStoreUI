import {User} from "./user";

export interface Review {
  id: number,
  user: User,
  date: Date,
  score: number,
  title: string,
  comment: string
}
