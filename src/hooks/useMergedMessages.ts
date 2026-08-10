import { Message, RawMessage } from '@/types/message'
import { isMessage } from '@/utils/isMessage'
import { useMemo } from 'react'



export const useMergedMessages = (messages: RawMessage[],messageUi: Message[]): Message[] => {

  // 🔹 нормализация firestore
  const dbMessages = useMemo(() => {
    return messages          // Проблема map он возвращает резульи массив. а что если элемент ошибочный. то он не пропустится, map обязан что то вернуть
      .map((msg) => {

       const createdAt = msg.createdAt.toDate().getTime();

        const message = { ...msg, createdAt}

        return message
         
      })
  }, [messages])

  // Объединение данных с firestore и у моментальных локальных сообщений
  const mergedMessages = useMemo(() => {
    const map = new Map<string, Message>()

    // optimistic
    for (const m of messageUi) {
      map.set(m.id, m)
    }

    // server (override)
    for (const m of dbMessages) {
      map.set(m.id, m)
    }

    return Array.from(map.values()).sort(
      (a, b) => a.createdAt - b.createdAt
    )
  }, [messageUi, dbMessages])

  return mergedMessages
}