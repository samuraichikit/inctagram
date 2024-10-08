import { ChangeEvent } from 'react'

import { useRouter } from 'next/router'

export const LangSelect = () => {
  const { asPath, locale, locales, pathname, push, query } = useRouter()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale })
  }

  return (
    <div>
      <select
        defaultValue={locale}
        onChange={changeLangHandler}
        style={{ background: 'black', position: 'absolute', right: '0', top: '20' }}
      >
        {locales?.map(l => {
          return (
            <option key={l} value={l}>
              {l}
            </option>
          )
        })}
      </select>
    </div>
  )
}

// style={{ background: 'black', position: 'absolute', right: '0', top: '20' }}
