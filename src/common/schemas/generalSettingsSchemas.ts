import {
  aboutMeSchema,
  citySchema,
  countrySchema,
  dateOfBirthSchema,
  firstLastNameSchema,
  regionSchema,
  userNameSchema,
} from '@/common/schemas/commonSchemas'
import { z } from 'zod'

import { Locale } from '../../../locales/ru'

export const generalSettingsSchemas = (t: Locale) => {
  return z.object({
    aboutMe: aboutMeSchema(t),
    city: citySchema(t),
    country: countrySchema(t),
    dateOfBirth: dateOfBirthSchema(t),
    firstName: firstLastNameSchema(t),
    lastName: firstLastNameSchema(t),
    region: regionSchema(t),
    userName: userNameSchema(t),
  })
}
