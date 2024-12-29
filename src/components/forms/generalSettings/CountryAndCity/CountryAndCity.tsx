import { ChangeEvent } from 'react'

import { cityType, countryType } from '@/components/forms/generalSettings/GeneralSettings.types'
import { GetProfileResponse } from '@/services/profile'

type PropsType = {
  cities: cityType[]
  countries: countryType[]
  form: any
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleChangeCity: (event: ChangeEvent<HTMLSelectElement>) => void
  profile: GetProfileResponse | undefined
  selectedCityValue: null | string
  selectedValue: null | string
}

export const CountryAndCity = ({
  cities,
  countries,
  form,
  handleChange,
  handleChangeCity,
  profile,
  selectedCityValue,
  selectedValue,
}: PropsType) => {
  return (
    <>
      <select
        {...form.register('country')}
        defaultValue={profile?.country || 'country'}
        onChange={handleChange}
        value={selectedValue || 'country'}
      >
        {countries?.map((c, i) => (
          <option key={i} value={c.country_name}>
            {c.country_name}
          </option>
        ))}
      </select>

      <select
        {...form.register('city')}
        defaultValue={profile?.city || 'city'}
        onChange={handleChangeCity}
        value={selectedCityValue || 'city'}
      >
        {cities.length > 1 ? (
          cities?.map((c, i) => (
            <option key={i} value={c.state_name}>
              {c.state_name}
            </option>
          ))
        ) : (
          <option value={'city'}>city</option>
        )}
      </select>
    </>
  )
}
