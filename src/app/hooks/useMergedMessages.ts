import { useMemo } from 'react'

interface Message {
  id: string
  text: string
  senderId: string
  createdAt: number
}

interface RawMessage {
  id: string
  text: string
  senderId: string
  createdAt: any // firestore timestamp
}

export const useMergedMessages = (messages: RawMessage[],messageUi: Message[]): Message[] => {

  // 🔹 нормализация firestore
  const dbMessages = useMemo(() => {
    return messages
      .map((msg) => {
        if (!msg?.createdAt) return null

        const createdAt =
          msg.createdAt?.toDate
            ? msg.createdAt.toDate().getTime()
            : msg.createdAt

        if (!createdAt) return null

        return {
          ...msg,
          createdAt,
        }
      })
      .filter(Boolean) as Message[]
  }, [messages])

  // 🔹 merge
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