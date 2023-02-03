// lint-staged.config.js
module.exports = {
  '**/*.ts?(x)': () => 'npm run type-check',
  '**/*.(ts|js)?(x)': (filenames) => [`npm run format-staged`, `npm run lint ${filenames.join(' ')}`]
}
