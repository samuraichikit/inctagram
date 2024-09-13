import s from './card.module.scss'
import clsx from "clsx";
import {ComponentProps} from "react";

type Props = ComponentProps<'div'>

export const Card = ({ className, ...props }: Props) => {
  return <div className={clsx(s.root, className)} {...props} ></div>
}
