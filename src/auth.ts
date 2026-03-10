import type {AuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getChatId } from './app/utils/getChatId';
import Credentials from 'next-auth/providers/credentials';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebase';



export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,  //string и ! одно и тоже
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
             httpOptions: {
        timeout: 10000, // 10 секунд
      },
        }),
        Credentials({
          credentials: {
            email: {label: 'email', type: 'email', required:true},
            password: {label: 'password', type: 'password', required:true},

             
          },
          async authorize(credentials){
             if (!credentials?.email || !credentials.password)  return null

            // напрямую делаем запрос.  Идея смотреть есть ли поле пароля, если нет добавляем
             const usersCollectionRef = collection(firestore, 'users');
            const q = query(
          usersCollectionRef,
          where("email", "==", credentials.email)
)
            const snapshot = await getDocs(q)
            if (snapshot.empty) return null
            const userDoc = snapshot.docs[0]
            const currentUser = userDoc.data()
  
            if(currentUser && !currentUser.password){ // пока без пароля авторизацию) если пароля в бд нет
            throw new Error("USE_GOOGLE_LOGIN")

          }
            else if(currentUser && currentUser.password === credentials.password){
               return {
                id: userDoc.id,
                name: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL, // вернули user с полями без пароля соо
  }
            } 
            
            return null 
          }
        })
    ],
    
    pages:{
        signIn: '/login' 
    },
    callbacks: {

 async jwt({ token, user }) {
    // user есть только при первом логине
    if (user) {
      token.uid = user.id;
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.uid = token.uid as string;
    }
    return session;
  },

    async signIn({ user }) {
    const { doc, getDoc, setDoc } = await import("firebase/firestore")
    const { firestore } = await import("@/firebase")
    const userRef = doc(firestore, "users", user.id)
    const snap = await getDoc(userRef)

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.id,
        displayName: user.name ?? null,
        email: user.email ?? null,
        photoURL: user.image ?? null,
        createdAt: new Date(),
      })

      console.log("Создан новый пользователь")
    } else {
      console.log("Пользователь уже существует")
    }

    console.log('Создание избранного')
        const chatId = getChatId(user.id,user.id)
        const chatRef = doc(firestore, 'chats', chatId)
        const doSnap = await getDoc(chatRef)

        if (!doSnap.exists()){
            await setDoc(chatRef,
                { 
                          uid: user.id,
                          members: [user.id, user.id],
                          membersInfo: {
                            [user.id]:{
                              displayName: 'Избранное',
                              photoURL: 'favorites.png'
                            }
                          },
                          updatedAt: "",
                          lastMessage: "", // передаем сообщение первое если нет чата
                        },
                        { merge: true }
            )
        }

    return true
  },

  
  

}



}