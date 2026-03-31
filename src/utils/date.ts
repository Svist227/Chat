export const isNewDay = (current: Date, prev?: Date | null) => {
  if (!prev) return true
  

  return (
    current.getFullYear() !== prev.getFullYear() ||
    current.getMonth() !== prev.getMonth() ||
    current.getDate() !== prev.getDate()
  )
}