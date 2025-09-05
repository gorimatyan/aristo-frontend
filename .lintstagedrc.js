const path = require("path")

// https://github.com/vercel/next.js/blob/55f3a6d8fb/docs/basic-features/eslint.md#lint-staged
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((file) => path.relative(process.cwd(), file))
    .join(" --file ")}`

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "npm run type:check", "prettier --write"],
  "*.css": ["prettier --write"],
  // "*.md": ["npm run doctoc", "prettier --write"],
  "*.md": ["prettier --write"],
}

module.exports = lintStagedConfig
