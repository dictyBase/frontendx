const fs = require("node:fs")
const path = require("node:path")
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
      default: "Vite based dictybase applications",
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
      type: "add",
      templateFile: "plop-templates/apps/vite.config.txt",
      path: "apps/{{dashCase name}}/vite.config.ts",
      skipIfExists: true,
    },
    {
      type: "add",
      templateFile: "plop-templates/apps/index.hbs",
      path: "apps/{{dashCase name}}/index.html",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/src/App.txt",
      dest: "apps/{{dashCase name}}/src/App.tsx",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/src/AppProviders.txt",
      dest: "apps/{{dashCase name}}/src/AppProviders.tsx",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/src/Layout.txt",
      dest: "apps/{{dashCase name}}/src/Layout.tsx",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/src/index.txt",
      dest: "apps/{{dashCase name}}/src/index.tsx",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/src/routes.txt",
      dest: "apps/{{dashCase name}}/src/routes.tsx",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/src/pages/index.txt",
      dest: "apps/{{dashCase name}}/src/pages/index.tsx",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/src/utils/themes.txt",
      dest: "apps/{{dashCase name}}/src/utils/themes.ts",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/.env.development.txt",
      dest: "apps/{{dashCase name}}/.env.development",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/apps/.env.development.local.txt",
      dest: "apps/{{dashCase name}}/.env.development.local",
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
      src: "plop-templates/packages/vitest.config.ts",
      dest: "packages/{{dashCase name}}/src/vitest.config.ts",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/setup.ts",
      dest: "packages/{{dashCase name}}/src/setup.ts",
      skipIfExists: true,
    },
    {
      type: "copy",
      src: "plop-templates/packages/index.txt",
      dest: "packages/{{dashCase name}}/src/index.ts",
      skipIfExists: true,
    },
    { type: "message", group: "package", folder: "packages" },
  ]
}

function messageAction(plop) {
  plop.setActionType("message", (answers, config, plop) => {
    const package_ = plop.renderString("{{lowerCase name}}", answers)
    const dir = plop.renderString("{{dashCase name}}", answers)
    console.log(
      chalk.cyan(`create ${config.group}`) +
        chalk.yellowBright(` @dictybase/${package_} `) +
        chalk.cyan("in") +
        chalk.yellowBright(` ${config.folder}/${dir} `) +
        chalk.cyan("folder"),
    )
  })
}

function copyAction(plop) {
  plop.setActionType("copy", (answers, config, plop) => {
    const source = plop.renderString(config.src, answers)
    const destination = plop.renderString(config.dest, answers)
    if (config.skipIfExists && fs.existsSync(destination)) {
      return
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.copyFileSync(source, destination)
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
