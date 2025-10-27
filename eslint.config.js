import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    ignores: ["dist", "build", "coverage"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "18" } },
    rules: {
      "linebreak-style": 0,
      "max-len": ["warn", { code: 300 }],
      "no-console": "warn",
      "prettier/prettier": ["warn", { endOfLine: "auto" }],
      "react/jsx-sort-props": ["warn", { ignoreCase: true }],
      semi: "error",
      "react/prop-types": "off",
      "import/no-relative-packages": "error",
      "import/order": [
        "error",
        {
          groups: ["external", "builtin"],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          distinctGroup: false,
        },
      ],

      // ✅ jadi WARNING, bukan error
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],

      "no-var": "error",
      "prefer-const": "error",
      curly: ["error", "multi-line"],
      eqeqeq: ["error", "always"],
      "react/destructuring-assignment": ["error", "always"],
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/no-typos": "error",
      "react/no-unused-prop-types": "error",
      "react/no-unused-state": "error",
      "react/no-unsafe": "error",
      "react/self-closing-comp": "error",
      "react/no-unescaped-entities": "error",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react-hooks/rules-of-hooks": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
];
