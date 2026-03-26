import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/app/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getToken } from "next-auth/jwt";


export async function POST(request:NextRequest) {
const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.uid) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }
  console.log('token в мидлware', token)
const {username} = await request.json()
if (!username) {
    return NextResponse.json({ message: "Не передан username" }, { status: 400 });
  }

  try {
    // Ссылка на документ пользователя
    const userRef = doc(collection(firestore as any, "users"), token.uid as string);   

    // Обновляем поле username
    await updateDoc(userRef, {
      username: username
    });

    // Можно вернуть успех
return NextResponse.json({ success: true });

    // Если хочешь сразу редирект на чат:
  } catch (err) {
    console.error("Ошибка обновления username:", err);
    return NextResponse.json({ message: "Ошибка обновления" }, { status: 500 });
  }

}