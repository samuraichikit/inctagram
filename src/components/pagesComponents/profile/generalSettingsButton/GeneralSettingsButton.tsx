import { ROUTES } from '@/common/constants'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

type Props = {
  isMyProfile: boolean
  profileId: number | string
}

export const GeneralSettingsButton = ({ isMyProfile, profileId }: Props) => {
  const { push } = useRouter()
  const { t } = useTranslation()

  const goToProfileSettingsHandler = () => {
    push(ROUTES.PROFILE.SETTINGS.GENERAL(profileId))
  }

  return (
    <>
      {isMyProfile && (
        <Button onClick={goToProfileSettingsHandler} variant={'secondary'}>
          {t.profile.settings.profileSettings}
        </Button>
      )}
    </>
  )
}
