// @ts-check
import turbo from "eslint-config-turbo/flat"
import github from "eslint-plugin-github"

export default [
  ...turbo,
  github.getFlatConfigs().recommended,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
  },
]
