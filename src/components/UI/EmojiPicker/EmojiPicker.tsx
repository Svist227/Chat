// EmojiPicker.tsx
'use client'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRef, useEffect } from 'react'
import './EmojiPicker.scss'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (emoji: string) => void
triggerRef: React.RefObject<HTMLButtonElement> // добавь

}


// переделать... 
const EmojiPicker = ({ isOpen, onClose, onSelect,triggerRef }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  // закрытие по клику снаружи
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    if (isOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="emoji-picker-wrap" ref={ref}>
      <Picker
        data={data}
        locale="ru"
        theme="light"
        previewPosition="none"
        skinTonePosition="none"
        onEmojiSelect={(emoji: { native: string }) => {
          onSelect(emoji.native)
          onClose()
        }}
      />
    </div>
  )
}

export default EmojiPicker