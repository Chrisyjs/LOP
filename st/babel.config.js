module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    '@babel/plugin-syntax-dynamic-import',
    // "transform-vue-jsx", "transform-runtime", "lodash"
    "lodash"
  ]
}
