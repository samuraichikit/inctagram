import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

import s from './langSelect.module.scss'

import { Select } from '../ui/select'
import { SelectItem } from '../ui/select/selectItem'
import { Typography } from '../ui/typography'
import flagRussia from './../../../public/flagRussia.png'
import flagUnitedKingdom from './../../../public/flagUnitedKingdom.png'

type Locales = 'en' | 'ru'

type LanguageDetails = {
  language: string
  src: StaticImageData
}

export const LangSelect = () => {
  const classNames = {
    selectItem: s.selectItem,
  }
  const { asPath, locale, locales, pathname, push, query } = useRouter()

  const languagesDetails: Record<Locales, LanguageDetails> = {
    en: { language: 'English', src: flagUnitedKingdom },
    ru: { language: 'Русский', src: flagRussia },
  }

  const changeLangHandler = (value: string) => {
    push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select onValueChange={changeLangHandler} value={locale}>
      {locales?.map(l => {
        const languageParams = languagesDetails[l as Locales]
        const { language, src } = languageParams

        return (
          <SelectItem key={l} value={l}>
            <div className={classNames.selectItem}>
              <Image alt={l} height={20} src={src} width={20} />
              <Typography variant={'regular_text_16'}>{language}</Typography>
            </div>
          </SelectItem>
        )
      })}
    </Select>
  )
}
