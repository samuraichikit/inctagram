import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

import s from './questionModal.module.scss'

type Props = {
  btnNo: () => void
  btnYes: () => void
  isOpen: boolean
  question: string
  title: string
}

export const QuestionModal = ({ btnNo, btnYes, isOpen, question, title }: Props) => {
  return (
    <Modal onOpenChange={btnNo} open={isOpen} title={title}>
      {question}
      <div className={s.yesNo}>
        <Button className={s.buttons} onClick={btnYes} variant={'outlined'}>
          {'Yes'}
        </Button>
        <Button className={s.buttons} onClick={btnNo}>
          {'No'}
        </Button>
      </div>
    </Modal>
  )
}
