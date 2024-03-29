module.exports = api => {
  api.cache(true)
  const presets = [
    [
      "@babel/preset-env",
      {
        corejs: "3.2.1",
        modules: false,
        useBuiltIns: "usage"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]

  const plugins = [
    [
      "import",
      {
        libraryName: "@nutui/nutui-react",
        libraryDirectory: "dist/esm",
        style: true,
        camel2DashComponentName: false
      },
      "nutui-react"
    ],
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-decorators",
      {
        decoratorsBeforeExport: true
      }
    ],
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "react-intl-auto"
  ]

  return {
    ignore: [],
    plugins,
    presets
  }
}
