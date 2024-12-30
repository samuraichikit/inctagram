import { cityType, countryType } from '@/components/forms/generalSettings/GeneralSettings.types'
import { GetProfileResponse } from '@/services/profile'
import axios from 'axios'

export const countryAndCityApi = {
  getCities(selectedValue: null | string, profile: GetProfileResponse | undefined) {
    return axios
      .get(`https://www.universal-tutorial.com/api/states/${selectedValue || profile?.country}`, {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuZXZhemhub2FsaWtoYW4xQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Ill6VEw4N2VES2x4LV9ibUE0R1JJUW9BSXUzcmtqZDh6c0JoTnQ3WDBEaXpKYUZfbnJOUDgwUE9oRWZ1TEpIbFJTVGsifSwiZXhwIjoxNzM1NjM3MTM4fQ.1YjVGNvvjnlwemowturBD1g9x4IW3xet_HEPY1gCdOc',
        },
      })
      .then(res => {
        const data: cityType[] = [{ state_name: profile?.city || 'city' }, ...res.data]

        return data
      })
  },

  getCountries(profile: GetProfileResponse) {
    return axios
      .get('https://www.universal-tutorial.com/api/countries/', {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuZXZhemhub2FsaWtoYW4xQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Ill6VEw4N2VES2x4LV9ibUE0R1JJUW9BSXUzcmtqZDh6c0JoTnQ3WDBEaXpKYUZfbnJOUDgwUE9oRWZ1TEpIbFJTVGsifSwiZXhwIjoxNzM1NjM3MTM4fQ.1YjVGNvvjnlwemowturBD1g9x4IW3xet_HEPY1gCdOc',
        },
      })
      .then(res => {
        const data: countryType[] = [
          {
            country_name: profile?.country || 'country',
            country_phone_code: 1,
            country_short_name: profile?.country || 'country',
          },
          ...res.data,
        ]

        return data
      })
  },
}
