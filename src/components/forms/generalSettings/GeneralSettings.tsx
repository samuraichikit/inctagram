import { ChangeEvent, useEffect, useId, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/common/hooks/useTranslation'
import { generalSettingsSchemas } from '@/common/schemas'
import { FormTextArea } from '@/components/controlled/formTextArea'
import { FormTextField } from '@/components/controlled/formTextField'
import { CountryAndCity } from '@/components/forms/generalSettings/CountryAndCity/CountryAndCity'
// eslint-disable-next-line import/namespace
import { countryAndCityApi } from '@/components/forms/generalSettings/CountryAndCity/CountryAndCity-API/countryAndCityApi'
import { cityType, countryType } from '@/components/forms/generalSettings/GeneralSettings.types'
import { Button } from '@/components/ui/button'
import { Datepicker } from '@/components/ui/datepicker'
import { ProfilePhotoEdit } from '@/components/ui/profile/profilePhoto/profilePhotoEdit/ProfilePhotoEdit'
import { ProfileSettingsBar } from '@/components/ui/profileSettingsBar'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import {
  useGetProfileQuery,
  useGetProfileWithPostsQuery,
  useUpdateProfileMutation,
} from '@/services/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
import { z } from 'zod'

import s from './generalSettings.module.scss'

type GeneralSettingsSchemasType = z.infer<ReturnType<typeof generalSettingsSchemas>>

export const GeneralSettings = () => {
  const { data: meInfo } = useMeQuery()
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const { data: profile, isLoading } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const formId = 'formId' + useId()

  const profileValues: GeneralSettingsSchemasType = {
    aboutMe: profile?.aboutMe ?? '',
    city: profile?.city ?? '',
    country: profile?.country ?? '',
    dateOfBirth: profile?.dateOfBirth ? profile?.dateOfBirth.slice(0, 10) : '',
    firstName: profile?.firstName ?? '',
    lastName: profile?.lastName ?? '',
    region: profile?.region ?? '',
    userName: profile?.userName ?? '',
  }

  const [mandatoryFieldsFilled, setMandatoryFieldsFilled] = useState(false)

  const { t } = useTranslation()

  const form = useForm<GeneralSettingsSchemasType>({
    defaultValues: profileValues,
    mode: 'onBlur',
    resolver: zodResolver(generalSettingsSchemas(t)),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = form

  const onSubmitHandler: SubmitHandler<GeneralSettingsSchemasType> = (
    data: GeneralSettingsSchemasType
  ) => {
    const profileData = {
      aboutMe: data.aboutMe || '',
      city: data.city || '',
      country: data.country || '',
      dateOfBirth: data.dateOfBirth || '',
      firstName: data.firstName,
      lastName: data.lastName,
      region: data.region || '',
      userName: data.userName,
    }

    updateProfile(profileData)
      .unwrap()
      .then(_ => {
        toast.success(t.generalSettings.savedSettings)
      })
      .catch(_ => {
        toast.error(t.generalSettings.notAvailable)
      })
  }

  useEffect(() => {
    form.reset({
      aboutMe: profile?.aboutMe || '',
      city: profile?.city || '',
      country: profile?.country || '',
      dateOfBirth: profile?.dateOfBirth || '',
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      region: profile?.region || '',
      userName: profile?.userName,
    })
  }, [profile])

  useEffect(() => {
    const subscription = watch(value => {
      localStorage.setItem('generalSettingsForm', JSON.stringify(value))

      if (value.userName !== '' && value.firstName !== '' && value.lastName !== '') {
        setMandatoryFieldsFilled(true)
      } else {
        setMandatoryFieldsFilled(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    const savedData = localStorage.getItem('generalSettingsForm')

    if (savedData) {
      reset(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    const unSubscription = (url: string) => {
      if (url !== '/auth/privacyPolicy') {
        localStorage.removeItem('generalSettingsForm')
      }
    }

    router.events.on('routeChangeStart', unSubscription)

    return () => {
      router.events.off('routeChangeStart', unSubscription)
    }
  }, [])

  const [countries, setCountries] = useState<countryType[]>([
    {
      country_name: profile?.country || 'country',
      country_phone_code: 1,
      country_short_name: profile?.country || 'country',
    },
  ])
  const [cities, setCities] = useState<cityType[]>([{ state_name: profile?.city || 'city' }])
  const [selectedValue, setSelectedValue] = useState<null | string>(null)
  const [selectedCityValue, setSelectedCityValue] = useState<null | string>(null)
  const [selectCountry, setSelectCountry] = useState(false)
  const [firstClick, setFirstClick] = useState(false)
  const [startClick, setStartClick] = useState(false)
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (profile) {
      countryAndCityApi
        .getCountries(profile)
        .then(data => {
          setCountries(data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          if (!profile?.country && !profile?.city) {
            setSelectedValue('country')
            setSelectedCityValue('city')
          }
          setInit(true)
        })
    }
  }, [profile])

  useEffect(() => {
    if (selectedValue || countries.length > 1) {
      countryAndCityApi
        .getCities(selectedValue, profile)
        .then(data => {
          setCities(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [selectedValue, countries])

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (selectedValue) {
      setSelectedValue(null)
      setCities([{ state_name: 'city' }])
      setSelectedCityValue(null)
    } else {
      setSelectedCityValue(null)
      setSelectCountry(true)
    }
    if (!firstClick) {
      setFirstClick(true)
    }
    setStartClick(false)
    setSelectedValue(event.target.value)
  }
  const handleChangeCity = (event: ChangeEvent<HTMLSelectElement>) => {
    if (selectedCityValue) {
      setSelectedCityValue(null)
    } else {
      setStartClick(true)
    }
    if (!firstClick) {
      setFirstClick(true)
    } else {
      setFirstClick(false)
    }
    setSelectedCityValue(event.target.value)
  }

  useEffect(() => {
    if (!selectCountry) {
      profile?.country && setSelectCountry(true)
    }
  }, [profile])

  return (
    <>
      {init && (
        <div className={s.formButtonWrapper}>
          <div className={s.wrapper}>
            <ProfileSettingsBar />
            <div className={s.photoAndFormWrapper}>
              {profile?.avatars.length !== 0 ? (
                <ProfilePhotoEdit avatar={profileWithPosts?.avatars[0]?.url ?? null} />
              ) : (
                <ProfilePhotoEdit />
              )}
              <form className={s.formWrapper} id={formId} onSubmit={handleSubmit(onSubmitHandler)}>
                <FormTextField
                  control={control}
                  label={t.signUp.username}
                  mandatory
                  name={'userName'}
                />
                <FormTextField
                  control={control}
                  label={t.profile.firstName}
                  mandatory
                  name={'firstName'}
                />
                <FormTextField
                  control={control}
                  label={t.profile.lastName}
                  mandatory
                  name={'lastName'}
                />
                <div>
                  <Typography asChild className={s.dateOfBirthLabel} variant={'regular_text_14'}>
                    <label>{t.profile.dOB}</label>
                  </Typography>

                  <Controller
                    control={control}
                    name={'dateOfBirth'}
                    render={({ field }) => {
                      let dateValue: Date | undefined

                      if (field.value !== undefined && field.value !== '') {
                        dateValue = new Date(field.value)
                      }

                      return (
                        <div>
                          <Datepicker onChange={field.onChange} value={dateValue} />
                          {errors.dateOfBirth?.message ===
                          'A user under 13 cannot create a profile.' ? (
                            <Typography variant={'error'}>
                              A user under 13 cannot create a profile.{' '}
                              <Link href={'/auth/privacyPolicy'}>Privacy Policy</Link>
                            </Typography>
                          ) : (
                            errors.dateOfBirth?.message
                          )}
                        </div>
                      )
                    }}
                  />
                </div>
                <div className={s.locationWrapper}>
                  <CountryAndCity
                    cities={cities}
                    countries={countries}
                    form={form}
                    handleChange={handleChange}
                    handleChangeCity={handleChangeCity}
                    profile={profile}
                    selectedCityValue={selectedCityValue}
                    selectedValue={selectedValue}
                  />
                </div>
                <FormTextArea
                  className={s.aboutMe}
                  control={control}
                  label={t.profile.aboutMe}
                  name={'aboutMe'}
                />
              </form>
            </div>
          </div>
          <Button
            className={s.formSubmitButton}
            disabled={
              !mandatoryFieldsFilled ||
              (selectCountry && !selectedCityValue && firstClick) ||
              (selectedValue === 'country' && selectedCityValue === 'city') ||
              startClick === false ||
              (selectedValue === 'country' && selectedCityValue === profile?.city)
            }
            form={formId}
            type={'submit'}
          >
            {t.profile.saveChanges}
          </Button>
        </div>
      )}
    </>
  )
}
