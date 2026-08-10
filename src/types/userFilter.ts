import { Timestamp } from "firebase/firestore"


export interface UserFilter extends User{
  createdAt: Timestamp
}

