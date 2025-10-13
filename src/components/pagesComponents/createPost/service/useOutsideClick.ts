import { useEffect } from 'react'

export const useOutsideClick = (ref: any, setClose: () => void) => {
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setClose()
      }
    }

    document.addEventListener('mousedown', outsideClickHandler)

    return () => {
      document.removeEventListener('mousedown', outsideClickHandler)
    }
  }, [ref, setClose])
}
