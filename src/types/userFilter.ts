import { Timestamp } from "firebase/firestore"
import { MyUser } from "./user"
export interface UserFilter extends MyUser{
  createdAt: Timestamp
}

