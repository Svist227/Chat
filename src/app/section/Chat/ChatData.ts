interface Message {
    text: string,
    isUser:boolean,
    time:string
}
interface ChatData {
        id: number,
        photo:string,
        name:string,
        messages: Message[]
}
const chatData:ChatData[] = [
    {
        id: 1,
        photo:'users/Avatar.png',
        name: 'Nicolai',
        messages: [
                    {
        text:'Первое сообщение',
        isUser: false,
        time: '18:45'
                     },
                    {
        text: 'Lorem ipsum dolor sit, amet consectetur adipisiss',
        isUser: true,
        time: '18:45',
                    },
     {
        text:'Hello world',
        isUser: true,
        time: '18:45'
    },
    {
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet reprehenderit veritatis debitis recusandae consequatur eius, nulla eveniet deserunt soluta, asperiores ipsa laudantium laborum quis, illo dicta aut hic iure maiores tenetur quasi dignissimos cum omnis quas. Facere officiis similique placeat eveniet sunt at qui, natus repellat repudiandae quos ab nisi quia sequi quae dolores soluta error vero nemo magni rerum, praesentium neque eligendi obcaecati! Nam, non? Quam ex amet modi repellendus necessitatibus tempore saepe, voluptas deleniti impedit ut obcaecati iste veniam quia voluptatum distinctio, consequuntur quae doloribus eligendi, harum recusandae. Ex porro nam quos distinctio laudantium eum impedit unde modi.',
        isUser: false,
        time: '18:45',
    },
     {
        text:'Hello world',
        isUser: true,
        time: '18:45'
    },
    {
        text:'Привет мир',
        isUser: false,
        time: '18:45',
    },  
        ]
        
    },
    {
        id: 2   ,
         photo:'users/Avatar2.png',
        name: 'Roma',
        messages: [
                    {
        text:'Второй чат',
        isUser: false,
        time: '18:45'
                     },
                    {
        text: 'Liss',
        isUser: true,
        time: '18:45',
                    },
     {
        text:'Hello world',
        isUser: true,
        time: '18:45'
    }, 
        ]
        
    },
     {
        id: 3,
          photo:'users/Avatar.png',
        name: 'Илон',
        messages: [
                    {
        text:'Третий чат',
        isUser: false,
        time: '18:45'
                     },
                    {
        text: 'Liss',
        isUser: true,
        time: '18:45',
                    },
     {
        text:'Hello world',
        isUser: true,
        time: '18:45'
    }, 
        ]
        
    },
     {
        id: 4,
         photo:'Avatar.png',
        name: 'Pavel',
        messages: [
                    {
        text:'Четверный чат',
        isUser: false,
        time: '18:45'
                     },
                    {
        text: 'Liss',
        isUser: true,
        time: '18:45',
                    },
     {
        text:'Hello world',
        isUser: true,
        time: '18:45'
    }, 
        ]
        
    }
]

export default chatData