const config = {
  '*': ['secretlint --maskSecrets --secretlintignore .gitignore "**/*"'],
  'src/**/*.{js,jsx,ts,tsx}': ['biome check --write --no-errors-on-unmatched'],
  'src/**/*.ts?(x)': () => 'npm run type-check',
  // 'src/**/*{,.*}.{css,scss}': [
  //   'biome format --write --no-errors-on-unmatched',
  //   'stylelint --fix',
  //   'stylelint',
  // ],
  'src/**/*.json': ['biome format --write'],
};

export default config;
