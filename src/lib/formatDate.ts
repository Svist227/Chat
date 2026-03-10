export default function formatRelativeDate(date: number) {
  const lastLoginDate = new Date(date)
  const now = new Date()

  // начало сегодняшнего дня
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )

  // начало вчерашнего дня
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfToday.getDate() - 1)

  // начало позавчера
  const startOfDayBeforeYesterday = new Date(startOfToday)
  startOfDayBeforeYesterday.setDate(startOfToday.getDate() - 2)

  const time = lastLoginDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  // минуты 
  const diffMinutes = Math.floor((Date.now() - date) / 60000)

  if (diffMinutes < 1) {
    return 'только что'
  }

  if (diffMinutes < 5) {
    return `был(а) ${diffMinutes} минуты назад`
  }
  if (diffMinutes < 30) {
    return `был(а) ${diffMinutes} минут назад`
  }
  if (diffMinutes == 30){
    return 'был(а) полчаса назад'
  }

  if (lastLoginDate >= startOfToday) {
    return `был(а) сегодня в ${time}`
  }

  if (lastLoginDate >= startOfYesterday) {
    return `был(а) вчера в ${time}`
  }

  if (lastLoginDate >= startOfDayBeforeYesterday) {
    return `был(а) позавчера в ${time}`
  }
  if (lastLoginDate.getFullYear() === now.getFullYear()) {
  const formattedDate = lastLoginDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })

  return `был(а) ${formattedDate} в ${time}`
}

  return `был(а) ${lastLoginDate.toLocaleDateString()} в ${time}`
}
