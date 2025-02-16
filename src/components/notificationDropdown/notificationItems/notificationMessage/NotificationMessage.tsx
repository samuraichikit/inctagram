import { useEffect, useState } from 'react'

import router from 'next/router'

type Props = {
  message: string
}

export const NotificationMessage = ({ message }: Props) => {
  const [translate, setTranslate] = useState('Loading...')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (router.locale === 'ru') {
      const textToTranslate = message

      setIsLoading(true)

      // Отправляем запрос к API Google Translate
      fetch(
        `https://translate.googleapis.com/language/translate/v2?key=AIzaSyATTjS_L2LWbMPN2tkl8vhJK1c96ldLHvQ&q=${textToTranslate}&target=ru&source=en`
      )
        .then(response => response.json())
        .then(res => {
          setTranslate(res.data.translations[0].translatedText)
          setIsLoading(false)
        })
    } else {
      setTranslate(message)
    }
  }, [router.locale])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>{translate}</div>
}
