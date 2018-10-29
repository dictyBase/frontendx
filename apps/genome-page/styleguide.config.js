module.exports = {
  components: "src/features/**/*.js",
  ignore: [
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*Actions.js",
    "**/*Constants.js",
    "**/*Reducer.js",
    "**/*Store.js",
    "**/*Styles.js",
    "**/mockData.js",
    "**/panelLabels.js",
    "src/features/Ontology/utils/*.js",
    "src/features/Ontology/Table/utils/*.js",
  ],
}
