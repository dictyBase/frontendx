module.exports = {
  extends: [
    "turbo",
    "react-app",
    "airbnb",
    "airbnb/hooks",
    "plugin:github/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:compat/recommended",
    "prettier",
  ],
  env: {
    browser: true,
  },
  globals: {
    vi: true,
    JSX: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    },
  ],
  ignorePatterns: ["next-env.d.ts"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: ["apps/genome-page/tsconfig.json"],
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    camelcase: "off",
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/no-cycle": ["error", { ignoreExternal: true }],
    quotes: ["off", "single"],
    semi: ["error", "never"],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { args: "after-used", ignoreRestSiblings: false },
    ],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".tsx", ".ts"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/require-default-props": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
      },
    ],
    "filenames/match-regex": "off",
    "github/array-foreach": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-for-of": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          snakeCase: true,
        },
      },
    ],
    "i18n-text/no-en": "off",
    "eslint-comments/no-use": [
      "error",
      { allow: ["eslint-disable", "eslint-disable-next-line"] },
    ],
    "unicorn/no-new-array": "off",
    "unicorn/switch-case-braces": ["error", "avoid"],
    "react/jsx-props-no-spreading": ["off", { explicitSpread: "ignore" }],
  },
}
