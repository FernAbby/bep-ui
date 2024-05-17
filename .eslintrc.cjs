/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    '@lints-config/eslint-config-vue-ts',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
