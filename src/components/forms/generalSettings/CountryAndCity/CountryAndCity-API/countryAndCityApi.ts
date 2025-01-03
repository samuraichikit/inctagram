import { cityType, countryType } from '@/components/forms/generalSettings/GeneralSettings.types'
import { GetProfileResponse } from '@/services/profile'
import axios from 'axios'

export const countryAndCityApi = {
  getCities(
    selectedValue: null | string | undefined,
    profile: { city?: string; country: string } | undefined
  ) {
    return axios
      .get(`https://api.countrystatecity.in/v1/countries/${selectedValue}/states`, {
        headers: {
          'X-CSCAPI-KEY': 'SnNMWVd2MkNId09vUlhtSmVFWkRGWERPNVV1eGlucVBRTGc3RTVUVg==',
        },
      })
      .then(res => {
        const data: cityType[] = [
          { id: 1, iso2: 'country', name: profile?.city || 'city' },
          ...res.data,
        ]

        return data
      })
  },

  getCountries(profile?: { country: string }) {
    return axios
      .get('https://api.countrystatecity.in/v1/countries', {
        headers: {
          'X-CSCAPI-KEY': 'SnNMWVd2MkNId09vUlhtSmVFWkRGWERPNVV1eGlucVBRTGc3RTVUVg==',
        },
      })
      .then(res => {
        const initCity = res.data.find((c: countryType) => c.name === profile?.country)
        const data: countryType[] = [
          {
            id: 1,
            iso2: initCity?.iso2 || '',
            name: profile?.country || 'country',
          },
          ...res.data,
        ]

        return data
      })
  },
}
