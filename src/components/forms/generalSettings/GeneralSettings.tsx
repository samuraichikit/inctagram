import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons/ImageOutline'
import { useTranslation } from '@/common/hooks/useTranslation'
import { generalSettingsSchemas } from '@/common/schemas'
import { FormTextArea } from '@/components/controlled/formTextArea'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { ProfileSettingsBar } from '@/components/ui/profileSettingsBar'
import { useMeQuery } from '@/services/auth'
import {
  useGetProfileQuery,
  useGetProfileWithPostsQuery,
  useUpdateProfileMutation,
} from '@/services/profile'
import { zodResolver } from '@hookform/resolvers/zod'
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

  const { t } = useTranslation()

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<GeneralSettingsSchemasType>({
    defaultValues: profileValues,
    mode: 'onBlur',
    resolver: zodResolver(generalSettingsSchemas(t)),
  })

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
          <FormTextField control={control} label={'Username*'} name={'userName'} required />
          <FormTextField control={control} label={'First Name*'} name={'firstName'} required />
          <FormTextField control={control} label={'Last Name*'} name={'lastName'} required />
          <FormTextField
            control={control}
            label={'Date of birth'}
            name={'dateOfBirth'}
            type={'date'}
          />
          <div className={s.locationWrapper}>
            <FormTextField
              className={s.locationItem}
              control={control}
              label={'Select your country'}
              name={'country'}
            />
            <FormTextField
              className={s.locationItem}
              control={control}
              label={'Select your city'}
              name={'city'}
            />
          </div>
          <FormTextArea control={control} label={'About Me'} name={'aboutMe'} rows={3} />
          <Button disabled={!isValid} type={'submit'}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}
