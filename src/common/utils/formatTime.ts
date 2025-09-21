export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })
}
