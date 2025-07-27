import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './viewAllComments.module.scss'

export const ViewAllCommentsButton = () => {
  const classNames = {
    text: s.text,
  }

  return (
    <Typography className={classNames.text} variant={'bold_text_14'}>
      View all comments
    </Typography>
  )
}
