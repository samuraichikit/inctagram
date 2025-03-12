import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  documents: ['src/**/!(*.generated).{ts,tsx}'],
  generates: {
    'src/': {
      config: {
        withHooks: true,
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: './services/admin/types.ts',
        extension: '.generated.tsx',
      },
    },
    'src/services/admin/types.ts': { plugins: ['typescript'] },
  },
  ignoreNoDocuments: true,
  schema: `https://inctagram.work/api/v1/graphql`,
}

export default config
