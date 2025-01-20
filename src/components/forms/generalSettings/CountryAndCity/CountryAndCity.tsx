import { ChangeEvent } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { ResponseCity, ResponseCountry } from '@/services/countryAndCity'
import { GetProfileResponse } from '@/services/profile'

import s from '../generalSettings.module.scss'

type PropsType = {
  changeCitySelect: (e: ChangeEvent<HTMLSelectElement>) => void
  changeCountrySelect: (e: ChangeEvent<HTMLSelectElement>) => void
  countries: ResponseCountry[] | undefined
  disableRegion: boolean
  form: any
  parentIdCity: number
  parentIdCountry: number
  region: ResponseCity | undefined
}

export const CountryAndCity = ({
  changeCitySelect,
  changeCountrySelect,
  countries,
  disableRegion,
  form,
  parentIdCity,
  parentIdCountry,
  region,
}: PropsType) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={s.selectWrapper}>
        <span>{t.profile.selectCountry}</span>
        <select
          {...form.register('country')}
          aria-label={t.profile.selectCountry}
          onChange={changeCountrySelect}
          value={parentIdCountry}
        >
          <option value={0}>Country</option>
          {countries?.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className={s.selectWrapper}>
        <span>{t.profile.selectCity}</span>
        <select
          {...form.register('city')}
          aria-label={t.profile.selectCountry}
          disabled={disableRegion}
          onChange={changeCitySelect}
          value={parentIdCity}
        >
          <option value={0}>City</option>
          {region?.edges.map(city => (
            <option key={city.node.id} value={city.node.id}>
              {city.node.name}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
