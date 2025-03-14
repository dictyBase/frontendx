// @ts-check
import turbo from "eslint-config-turbo/flat"
import github from "eslint-plugin-github"
import unicorn from "eslint-plugin-unicorn"
import sonarjs from "eslint-plugin-sonarjs"
import typescriptParser from "@typescript-eslint/parser"

export default [
  ...turbo,
  github.getFlatConfigs().recommended,
  sonarjs.configs.recommended,
  unicorn.configs.recommended,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
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
  },
]
