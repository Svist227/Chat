import { firestore } from "@/firebase";
import { createUser } from "@/lib/createUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    console.log('выполняется POST')
    

    const {email ,username, password, } = await request.json()
     // напрямую делаем запрос.  Идея смотреть есть ли поле пароля, если нет добавляем
    const usersCollectionRef = collection(firestore, 'users');
    const q = query(
          usersCollectionRef,
          where("email", "==", email)
            )
    const snapshot = await getDocs(q)
    if(snapshot.empty){ // если не сущ
        await createUser({
            uid:'',
            displayName: username,
            email: email,
            password:password,
            photoURL:''
        })
        return NextResponse.json({ message: 'ok' })
    }
    
    return NextResponse.json({ message: 'no' })

}