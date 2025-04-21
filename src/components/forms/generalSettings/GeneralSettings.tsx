import { ChangeEvent, useEffect, useId, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/constants'
import { useTranslation } from '@/common/hooks/useTranslation'
import { generalSettingsSchemas } from '@/common/schemas'
import { FormTextArea } from '@/components/controlled/formTextArea'
import { FormTextField } from '@/components/controlled/formTextField'
import { CountryAndCity } from '@/components/forms/generalSettings/CountryAndCity/CountryAndCity'
import { SkeletonGeneralSettings } from '@/components/forms/generalSettings/SkeletonGeneralSettings'
import { ProfilePhotoEdit } from '@/components/ui/profile/profilePhoto/profilePhotoEdit/ProfilePhotoEdit'
import { useMeQuery } from '@/services/auth'
import { useGetCountryQuery, useGetRegionsQuery } from '@/services/countryAndCity'
import {
  useGetProfileQuery,
  useGetProfileWithPostsQuery,
  useUpdateProfileMutation,
} from '@/services/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Datepicker, Typography } from '@samuraichikit/inc-ui-kit'
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
    form.reset(profileValues)
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
      if (url !== ROUTES.AUTH.PRIVACY_POLICY) {
        localStorage.removeItem('generalSettingsForm')
      }
    }

    router.events.on('routeChangeStart', unSubscription)

    return () => {
      router.events.off('routeChangeStart', unSubscription)
    }
  }, [])

  const ServerCountry = profile?.country || 0
  const ServerCity = profile?.city || 0

  const { data: countries, isLoading: isLoadingCountry } = useGetCountryQuery()

  useEffect(() => {
    if (countries) {
      const initCountry = countries.find(c => c.id === ServerCountry)

      if (initCountry) {
        setParentIdCountry(Number(initCountry.id))
      }
    }
  }, [countries])
  const [parentIdCountry, setParentIdCountry] = useState<number>(0)

  const { data: region, refetch } = useGetRegionsQuery(parentIdCountry, {
    skip: parentIdCountry === 0,
  })

  useEffect(() => {
    if (region) {
      const initCity = region.edges.find(c => c.node.id === ServerCity)

      if (initCity) {
        setParentIdCity(Number(initCity.node.id))
      }
    }
  }, [region])
  const [parentIdCity, setParentIdCity] = useState<number>(0)

  const [disableRegion, setDisableRegion] = useState(true)

  useEffect(() => {
    if (region) {
      setDisableRegion(false)
    }
  }, [region])

  const [validateCountry, setValidateCountry] = useState(false)
  const [validateCity, setValidateCity] = useState(false)

  const changeCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const parentId = e.currentTarget.value

    if (!disableRegion) {
      setDisableRegion(true)
    }
    if (validateCity) {
      setValidateCity(false)
    }
    setValidateCountry(true)

    setParentIdCountry(Number(parentId))
  }

  const changeCitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const parentId = e.currentTarget.value

    setValidateCity(true)
    setParentIdCity(Number(parentId))
  }

  return (
    <>
      <div className={s.rootBlock}>
        {profile && !isLoadingCountry ? (
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
                            <Link href={ROUTES.AUTH.PRIVACY_POLICY}>Privacy Policy</Link>
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
                  changeCitySelect={changeCitySelect}
                  changeCountrySelect={changeCountrySelect}
                  countries={countries}
                  disableRegion={disableRegion}
                  form={form}
                  parentIdCity={parentIdCity}
                  parentIdCountry={parentIdCountry}
                  region={region}
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
        ) : (
          <SkeletonGeneralSettings />
        )}
      </div>
      {profile && !isLoadingCountry && (
        <Button
          className={s.formSubmitButton}
          disabled={!mandatoryFieldsFilled || (validateCountry && !validateCity)}
          form={formId}
          onClick={() => {
            setValidateCountry(false)
            setValidateCity(false)
          }}
          type={'submit'}
        >
          {t.profile.saveChanges}
        </Button>
      )}
    </>
  )
}
