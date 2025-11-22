import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        useTypeImports: true,
        avoidOptionals: true,
        enumsAsTypes: true,
      },
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        useTypeImports: true,
        avoidOptionals: true,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
