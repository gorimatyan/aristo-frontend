import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Next.js基本設定
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ),

  // プラグイン設定
  ...compat.plugins("unused-imports"),

  {
    ignores: [
      "**/node_modules/*",
      "**/.next/*",
      "**/build/*",
      "**/dist/*",
      "next-env.d.ts",
    ],
  },

  // メインルール設定
  {
    rules: {
      // Import関連
      "unused-imports/no-unused-imports": ["error"],

      // React関連
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never", propElementValues: "always" },
      ],

      // TypeScript関連
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],

      // コード品質
      "no-console": ["error", { allow: ["error"] }],
      "prefer-const": "error",
    },
  },

  // テスト・Storybookファイル用の緩いルール
  {
    files: ["**/*.test.*", "**/*.spec.*", "**/*.stories.*"],
    rules: {
      "no-console": "off",
      "prefer-const": "off",
    },
  },
]

export default eslintConfig
