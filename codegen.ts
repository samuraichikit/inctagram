import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `https://inctagram.work/api/v1/graphql`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    'src/services/admin/types.ts': { plugins: ['typescript'] },
    'src/': {
        preset: 'near-operation-file',
        presetConfig: {
            extension: '.generated.tsx',
            baseTypesPath: './services/admin/types.ts',
        },
        plugins: ['typescript-operations', 'typescript-react-apollo'],
        config: {
            withHooks: true
        }
    },
},
  ignoreNoDocuments: true,
};

export default config;
