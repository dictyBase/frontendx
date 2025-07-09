// @ts-check
import { defineConfig } from "eslint/config";
import turbo from "eslint-config-turbo/flat"
import compat from "eslint-plugin-compat"
import github from "eslint-plugin-github"
import unicorn from "eslint-plugin-unicorn"
import sonarjs from "eslint-plugin-sonarjs"
import prettier from "eslint-plugin-prettier/recommended"
import typescriptParser from "@typescript-eslint/parser"
import tseslintconfig from "./typescript.js"
import reactApp from "./reactAppClone.js"

export default defineConfig([
  ...turbo,
  reactApp,
  tseslintconfig,
  github.getFlatConfigs().recommended,
  sonarjs.configs.recommended,
  unicorn.configs.recommended,
  compat.configs["flat/recommended"],
  prettier,
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
])
