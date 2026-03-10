import {set, ref, getDatabase, onDisconnect} from 'firebase/database'


    // Realtime database

export default function realtime(uid:string | null){
    const database = getDatabase();
    const statusref = ref(database, 'status/' + uid )

    // Запись данных статуса онлайн
    function writeUserData(){
    console.log('Пошла запись realtime uid: ', uid)
    set(statusref, {
        state: 'online',
        lastLogin: Date.now(),
    })
    }

    writeUserData()

    // update данных, если чел вышел
    onDisconnect(statusref).set({
        state: "offline",
        lastLogin: Date.now()
    })

}



export  function setTyping(chatid:string, uid:string){
    const database = getDatabase();
    const typingref = ref(database, `typing/${chatid}/${uid}`)

    // Запись данных статуса онлайн
    function writeUserTyping(){
    console.log('Пошла запись печатает chatid: ', chatid)
    set(typingref, {
        prints: false // в общем создать для этого отдельную веткку в вебсокете 
    })
    }

    writeUserTyping()

   

}

