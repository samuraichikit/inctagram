import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `https://inctagram.work/api/v1/graphql`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/services/admin/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;