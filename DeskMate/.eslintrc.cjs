module.exports = {
  root: true,
  env: { browser: true, es2020: true, es6: true },
  plugins: ["react-refresh", "@typescript-eslint", "prettier", "react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: true,
  },
  extends: [
    "plugin:react/jsx-runtime",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".ts", ".tsx", ".d.ts"],
      },
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    indent: [
      "error",
      4,
      {
        SwitchCase: 1,
      },
    ],
    /* General */
    "no-console": "warn",
    "consistent-return": "off",
    "no-case-declarations": "off",
    "no-use-before-define": "off",
    "no-bitwise": "off",
    curly: ["warn", "all"],
    "react/jsx-no-bind": "off",
    radix: ["error", "as-needed"],
    eqeqeq: ["warn", "smart"],
    "no-plusplus": "off",
    camelcase: "warn",
    "class-methods-use-this": "warn",
    "prefer-destructuring": "warn",
    "array-callback-return": "warn",
    "no-underscore-dangle": "off",
    /* React */
    "react/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/sort-comp": "off",
    "react/display-name": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".tsx"],
      },
    ],
    /* TypScript */
    "@typescript-eslint/no-use-before-define": [
      "warn",
      {
        functions: false,
        variables: false,
      },
    ],
    "@typescript-eslint/no-namespace": [
      "warn",
      {
        allowDeclarations: true,
      },
    ],
    /* Imports */
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      {
        json: "always",
      },
    ],
    /* jsx-a11y */
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/iframe-has-title": "warn",
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-is-valid": "off",
    /* Prettier */
    "prettier/prettier": [
      "warn",
      {
        $schema: "http://json.schemastore.org/prettierrc",
        printWidth: 150,
        tabWidth: 4,
        semi: false,
        singleQuote: false,
        endOfLine: "auto",
      },
    ],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/no-array-index-key": "off",
    "no-shadow": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/jsx-wrap-multilines": ["warn"],
    "no-nested-ternary": "warn",
    "sort-imports": [
      "warn",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          ["external", "builtin"],
          ["internal", "sibling", "parent", "index"],
        ],
        pathGroups: [
          {
            pattern: "@(react|react-)",
            group: "external",
            position: "before",
          },
          {
            pattern: "src/**",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
      },
    ],
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-misused-promises": [
      "warn",
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
