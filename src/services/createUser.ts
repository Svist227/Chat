import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore"
import { firestore } from "@/lib/firebase"


type UserParams = {
  uid:string ,
  username: string | null,
  email:string | null,
  password: string | null,
  photoURL:string | null
}
// создается user в firestore
export const createUser = async (user: UserParams) => {
  // ссылка на коллекцию и в ней документ users
 

  const usersColRef = collection(firestore, "users")

  // ссылка на новый документ с генерацией id
  const userRef = user.uid ? doc(firestore, "users", user.uid) : doc(usersColRef)

  
    console.log('Создаем user')
     // запись данных где указываем куда, и что пишем, и merge чтобы данные сохранялись
  await setDoc(
    userRef,
    {
      uid:userRef.id,
      username: user.username || null,
      email: user.email,
      password:user.password,
      photoURL: user.photoURL || null,
      lastLogin: serverTimestamp(),
    },
    { merge: true } // ← очень важно
  )
  

 
}
