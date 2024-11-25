import { SubmitHandler, useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons/ImageOutline'
import { useTranslation } from '@/common/hooks/useTranslation'
import { generalSettingsSchemas } from '@/common/schemas'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { ProfileSettingsBar } from '@/components/ui/profileSettingsBar'
import { useMeQuery } from '@/services/auth'
import { useGetProfileWithPostsQuery, useUpdateProfileMutation } from '@/services/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './generalSettings.module.scss'
import {ProfilePhotoEdit} from "@/components/ui/profile/profilePhoto/profilePhotoEdit/ProfilePhotoEdit";
import {BlankCover} from "@/components/ui/profile/profilePhoto/blankCover/BlankCover";

type GeneralSettingsSchemasType = z.infer<ReturnType<typeof generalSettingsSchemas>>

export const GeneralSettings = () => {
  const { t } = useTranslation()
  const { data: meInfo } = useMeQuery()
  const { data: profileInfo } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const router = useRouter()

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<GeneralSettingsSchemasType>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      region: '',
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(generalSettingsSchemas(t)),
  })

  const [updateProfile] = useUpdateProfileMutation()

  const onSubmitHandler: SubmitHandler<GeneralSettingsSchemasType> = (
    data: GeneralSettingsSchemasType
  ) => {
    console.log(data)

    updateProfile(data)
      .unwrap()
      .then(_ => {
        router.push(`/profile/${meInfo?.userId}`)
      })
      .catch(_ => {
        alert('Error! Server is not available!')
      })
  }

  return (
    <div className={s.wrapper}>
      <ProfileSettingsBar />
      <div className={s.photoAndFormWrapper}>
        {profileInfo?.avatars.length !== 0 ? (
            <ProfilePhotoEdit avatar={profileInfo?.avatars[0].url} />
        ) : (
            <ProfilePhotoEdit />
        )}
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmitHandler)}>
          <FormTextField control={control} label={t.signUp.username} name={'userName'}/>
          <FormTextField control={control} label={`${t.profile.firstName}*`} name={'firstName'}/>
          <FormTextField control={control} label={`${t.profile.lastName}*`} name={'lastName'}/>
          <FormTextField control={control} label={t.profile.selectCountry} name={'country'}/>
          <FormTextField control={control} label={t.profile.selectCity} name={'city'}/>
          <FormTextField control={control} label={t.profile.dOB} name={'dateOfBirth'}/>
          <FormTextField control={control} label={`${t.profile.aboutMe}*`} name={'aboutMe'}/>
          <Button type={'submit'}>{t.profile.saveChanges}</Button>
        </form>
      </div>
    </div>
  )
}
