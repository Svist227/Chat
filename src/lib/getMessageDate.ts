
export default function getMessageDate(Currenttime:Date, prevTime?:Date | null){

    // дальше по идее привести в нач положение дня и сравнивать. если разные дни, то перед сообщением рендер даты
let isNewDayState = false;

if (prevTime) {
  const startCurrentTime = new Date(
    Currenttime.getFullYear(),
    Currenttime.getMonth(),
    Currenttime.getDate()
  )

  const startPrevTime = new Date(
    prevTime.getFullYear(),
    prevTime.getMonth(),
    prevTime.getDate()
  )


  isNewDayState = startCurrentTime.getTime() !== startPrevTime.getTime()
} else {
  // первое сообщение — всегда новый день
  isNewDayState = true

}

  // дата сообщений
  const dataData = Currenttime.toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
})


    return dataData

}