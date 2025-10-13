import { useEffect, useRef, useState } from 'react'

export const useElementInView = (options?: globalThis.IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries

      setIsInView(entry.isIntersecting)
    }, options)

    const target = targetRef.current

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [options])

  return { isInView, targetRef }
}
