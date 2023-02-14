const fs = require("fs")
const path = require("path")
const chalk = require("chalk")

function appPrompts() {
  return [
    {
      type: "input",
      name: "name",
      message: "Name of the app >",
    },
    {
      type: "input",
      name: "author",
      message: "Author of the package >",
    },
    {
      type: "input",
      name: "description",
      message: "Description of the package >",
      default: "NextJs based dictybase applications",
    },
    {
      type: "input",
      name: "license",
      message: "License of the package >",
      default: "BSD-2-Clause",
    },
  ]
}

function appActions() {
  return [
    {
      type: "copy",
      src: "plop-templates/apps/tsconfig.txt",
      dest: "apps/{{dashCase name}}/tsconfig.json",
      skipIfExists: true,
    },
    {
      type: "add",
      templateFile: "plop-templates/apps/package.hbs",
      path: "apps/{{dashCase name}}/package.json",
      skipIfExists: true,
    },
    {
      type: "add",
      templateFile: "plop-templates/apps/readme.hbs",
      path: "apps/{{dashCase name}}/README.md",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/next-env-d.txt",
      dest: "apps/{{dashCase name}}/next-env.d.ts",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/next-config.txt",
      dest: "apps/{{dashCase name}}/next.config.js",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/index.txt",
      dest: "apps/{{dashCase name}}/pages/index.tsx",
      skipIfExists: true,
    },
    { type: "message", group: "app", folder: "apps" },
  ]
}

function packagePrompts() {
  return [
    {
      type: "input",
      name: "name",
      message: "Name of the package >",
    },
    {
      type: "input",
      name: "author",
      message: "Author of the package >",
    },
    {
      type: "input",
      name: "description",
      message: "Description of the package >",
      default: "React component for dictybase applications",
    },
    {
      type: "input",
      name: "license",
      message: "License of the package >",
      default: "BSD-2-Clause",
    },
  ]
}

function packageActions() {
  return [
    {
      type: "copy",
      src: "plop-templates/packages/tsconfig.txt",
      dest: "packages/{{dashCase name}}/tsconfig.json",
      skipIfExists: true,
    },
    {
      type: "add",
      templateFile: "plop-templates/packages/package.hbs",
      path: "packages/{{dashCase name}}/package.json",
      skipIfExists: true,
    },
    {
      type: "add",
      templateFile: "plop-templates/packages/readme.hbs",
      path: "packages/{{dashCase name}}/README.md",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/button.txt",
      dest: "packages/{{dashCase name}}/src/button.tsx",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/counter.txt",
      dest: "packages/{{dashCase name}}/src/counter.ts",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/index.txt",
      dest: "packages/{{dashCase name}}/src/index.ts",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/react-shim.js",
      dest: "packages/{{dashCase name}}/react-shim.js",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/.swcrc",
      dest: "packages/{{dashCase name}}/.swcrc",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/.prettierrc",
      dest: "packages/{{dashCase name}}/.prettierrc",
      skipIfExists: true,
    },
    { type: "message", group: "package", folder: "packages" },
  ]
}

function messageAction(plop) {
  plop.setActionType("message", (answers, config, plop) => {
    const pkg = plop.renderString("{{lowerCase name}}", answers)
    const dir = plop.renderString("{{dashCase name}}", answers)
    console.log(
      chalk.cyan(`create ${config.group}`) +
        chalk.yellowBright(` @dictybase/${pkg} `) +
        chalk.cyan("in") +
        chalk.yellowBright(` ${config.folder}/${dir} `) +
        chalk.cyan("folder"),
    )
  })
}

function copyAction(plop) {
  plop.setActionType("copy", (answers, config, plop) => {
    const src = plop.renderString(config.src, answers)
    const dest = plop.renderString(config.dest, answers)
    if (config.skipIfExists) {
      if (fs.existsSync(dest)) {
        return
      }
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest)
  })
}

module.exports = function (plop) {
  copyAction(plop)
  messageAction(plop)
  plop.setDefaultInclude({ actionTypes: true })
  plop.setGenerator("package", {
    description: "generate package boilerplate",
    prompts: packagePrompts(),
    actions: packageActions(),
  })
  plop.setGenerator("app", {
    description: "generate app boilerplate",
    prompts: appPrompts(),
    actions: appActions(),
  })
}
