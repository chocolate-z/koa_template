const path = require('node:path')

function createCommand(prefix, join) {
  return filenames => `${prefix} ${filenames.map(f => path.relative(process.cwd(), f)).join(` ${join} `)}`
}

module.exports = {
  '*.{js,mjs,cjs}': ['oxlint src', createCommand('npx eslint --fix', ''), createCommand('prettier --write', '--write')]
}
