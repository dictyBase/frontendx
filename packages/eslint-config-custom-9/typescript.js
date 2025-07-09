import { defineConfig } from "eslint/config"
import typescriptParser from "@typescript-eslint/parser"
import tseslint from "@typescript-eslint/eslint-plugin"

export default defineConfig([
  {
    files: ['**/*.ts?(x)'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },

      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
      "default-case": "off",
      // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
      "no-dupe-class-members": "off",
      // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
      "no-undef": "off",

      // Add TypeScript specific rules (and turn off ESLint equivalents)
      "@typescript-eslint/consistent-type-assertions": "warn",
      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "warn",
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "warn",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": [
        "warn",
        {
          functions: false,
          classes: false,
          variables: false,
          typedefs: false,
        },
      ],
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
          ignoreRestSiblings: true,
        },
      ],
      "no-useless-constructor": "off",
      "@typescript-eslint/no-useless-constructor": "warn",
    },
  },
])
