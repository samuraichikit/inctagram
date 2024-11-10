import { type ClassValue, clsx } from 'clsx'

export function cn(...classes: ClassValue[]) {
  return clsx(...classes)
}
