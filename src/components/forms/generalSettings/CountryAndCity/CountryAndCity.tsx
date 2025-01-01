import { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { countryAndCityApi } from '@/components/forms/generalSettings/CountryAndCity/CountryAndCity-API/countryAndCityApi'
import { cityType, countryType } from '@/components/forms/generalSettings/GeneralSettings.types'

import s from '../generalSettings.module.scss'

type PropsType = {
  cities: cityType[]
  countries: countryType[]
  findRes: boolean
  form: any
  setCities: (cityType: cityType[]) => void
  setCountries: (countries: countryType[]) => void
  setFocusCity: (isFocus: boolean) => void
  setFocusCountry: (isFocus: boolean) => void
}

export const CountryAndCity = ({
  cities,
  countries,
  findRes,
  form,
  setCities,
  setCountries,
  setFocusCity,
  setFocusCountry,
}: PropsType) => {
  const { t } = useTranslation()

  const [disableCity, setDisableCity] = useState(false)
  const [valueCity, setValueCity] = useState('city')
  const [valueCountry, setValueCountry] = useState('country')

  const changeSelectCountry = (countryName: string) => {
    setValueCountry(countryName)
    setValueCity('city')
    setFocusCountry(true)
    setFocusCity(false)
    setDisableCity(true)
    countryAndCityApi
      .getCountries({ country: countryName })
      .then(data => {
        setCountries(data)

        return data
      })
      .then(data => {
        countryAndCityApi
          .getCities(data[0].iso2, { country: countryName })
          .then(data => {
            setCities(data)

            return data
          })
          .then(data => {
            if (data.length === 1) {
              setFocusCity(true)
            } else {
              setFocusCity(false)
            }
          })
      })
      .finally(() => {
        setTimeout(() => {
          setDisableCity(false)
        }, 700)
      })
  }

  const changeCity = (cityName: string) => {
    if (findRes) {
      setFocusCountry(false)
      setFocusCity(true)
    } else {
      setFocusCity(true)
    }
    setValueCity(cityName)
  }

  return (
    <>
      <div className={s.selectWrapper}>
        <span>{t.profile.selectCountry}</span>
        <select
          {...form.register('country')}
          aria-label={t.profile.selectCountry}
          defaultValue={'country'}
          onChange={e => changeSelectCountry(e.target.value)}
          value={valueCountry}
        >
          {countries?.map((c, i) => {
            return (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            )
          })}
        </select>
      </div>

      <div className={s.selectWrapper}>
        <span>{t.profile.selectCity}</span>
        <select
          {...form.register('city')}
          aria-label={t.profile.selectCountry}
          disabled={!!disableCity}
          onChange={e => changeCity(e.target.value)}
          value={valueCity}
        >
          {cities.length > 1 ? (
            cities?.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))
          ) : (
            <option value={'city'}>city</option>
          )}
        </select>
      </div>
    </>
  )
}
