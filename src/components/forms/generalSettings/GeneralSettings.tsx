import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons/ImageOutline'
import { useTranslation } from '@/common/hooks/useTranslation'
import { generalSettingsSchemas } from '@/common/schemas'
import { FormTextArea } from '@/components/controlled/formTextArea'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Datepicker } from '@/components/ui/datepicker'
import { ProfileSettingsBar } from '@/components/ui/profileSettingsBar'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import {
  useGetProfileQuery,
  useGetProfileWithPostsQuery,
  useUpdateProfileMutation,
} from '@/services/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import router from 'next/router'
import { z } from 'zod'

import s from './generalSettings.module.scss'

type GeneralSettingsSchemasType = z.infer<ReturnType<typeof generalSettingsSchemas>>

export const GeneralSettings = () => {
  const { data: meInfo } = useMeQuery()
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const { data: profile } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()

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
    formState: { errors, isValid },
    getValues,
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
        alert('Your settings are saved!')
      })
      .catch(_ => {
        alert('Error! Server is not available!')
      })
  }

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

  return (
    <div className={s.wrapper}>
      <ProfileSettingsBar />
      <div className={s.photoAndFormWrapper}>
        <div className={s.addPhotoWrapper}>
          <div className={s.photoWrapper}>
            {profileWithPosts?.avatars.length !== 0 ? (
              <img alt={'Avatar'} src={profileWithPosts?.avatars[0].url} />
            ) : (
              <ImageOutline height={48} width={48} />
            )}
          </div>
          <Button variant={'outlined'}>{t.profile.settings.profilePhoto}</Button>
        </div>

        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmitHandler)}>
          <FormTextField control={control} label={t.signUp.username} name={'userName'} />
          <FormTextField control={control} label={`${t.profile.firstName}*`} name={'firstName'} />
          <FormTextField control={control} label={`${t.profile.lastName}*`} name={'lastName'} />
          <FormTextField control={control} label={t.profile.selectCountry} name={'country'} />
          <FormTextField control={control} label={t.profile.selectCity} name={'city'} />
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
                  {errors.dateOfBirth?.message === 'A user under 13 cannot create a profile.' ? (
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

          <FormTextArea control={control} label={`${t.profile.aboutMe}*`} name={'aboutMe'} />
          <Button disabled={!mandatoryFieldsFilled} type={'submit'}>
            {t.profile.saveChanges}
          </Button>
        </form>
      </div>
    </div>
  )
}
