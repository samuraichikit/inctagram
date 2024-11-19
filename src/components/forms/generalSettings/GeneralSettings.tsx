import { SubmitHandler, useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

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
import { z } from 'zod'

import s from './generalSettings.module.scss'

type GeneralSettingsSchemasType = z.infer<ReturnType<typeof generalSettingsSchemas>>

export const GeneralSettings = () => {
  const { data: meInfo } = useMeQuery()
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const { data: profile } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()

  const profileValuesLS = localStorage.getItem('generalSettingsForm')
  const profileValuesPersist: GeneralSettingsSchemasType =
    profileValuesLS && JSON.parse(profileValuesLS)

  console.log(profileValuesPersist)

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

  const { control, handleSubmit, setValue, watch } = useForm<GeneralSettingsSchemasType>({
    defaultValues: profileValues,
    mode: 'onBlur',
    resolver: zodResolver(generalSettingsSchemas(t)),
  })

  useFormPersist('generalSettingsForm', { setValue, storage: window.localStorage, watch })

  const onSubmitHandler: SubmitHandler<GeneralSettingsSchemasType> = (
    data: GeneralSettingsSchemasType
  ) => {
    updateProfile(data)
      .unwrap()
      .then(_ => {
        alert('Your settings are saved!')
      })
      .catch(_ => {
        alert('Error! Server is not available!')
      })
  }

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
          <FormTextField control={control} label={'Username*'} name={'userName'} />
          <FormTextField control={control} label={'First Name*'} name={'firstName'} />
          <FormTextField control={control} label={'Last Name*'} name={'lastName'} />
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
          <Button type={'submit'}>Save Changes</Button>
        </form>
      </div>
    </div>
  )
}
