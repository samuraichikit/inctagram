import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '@samuraichikit/inc-ui-kit/dist/index.css'

const preview: Preview = {
  parameters: {
    actions: {},
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
