var path = require('path');

function buildEsLintCommand(files) {
  const relativeFiles = files.map(function (file) {
    return path.relative(process.cwd(), file);
  });

  return 'eslint --fix ' + relativeFiles.join(' ');
}

module.exports = {
  '*.{js,ts,mjs,cjs}': ['prettier --write'],
  'src/**/*.ts': [buildEsLintCommand],
  '*': function () {
    return ['npx tsc --noEmit', 'npm run test:coverage:check'];
  },
};
