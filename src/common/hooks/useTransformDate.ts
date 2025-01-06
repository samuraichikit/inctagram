export const useTransformDate = (isoDateString: string) => {
  // Преобразование в объект Date
  const date = new Date(isoDateString)

  // Получение отдельных компонентов даты
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, '0')

  // Формирование строки в нужном формате
  const formattedDate = `${day}.${month}.${year}`

  return formattedDate
}
