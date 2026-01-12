import createConfig from "@workspace/eslint-config/create-config";

export default createConfig(
  {
    react: true,
  },
  {
    rules: {
      "antfu/top-level-function": "off",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md", "~__root.tsx"],
        },
      ],
      // Add rule overrides for the warnings you want to allow
      "react-refresh/only-export-components": "off",
      "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
      "react/no-unstable-context-value": "off",
      "react-dom/no-dangerously-set-innerhtml": "off",
      "react/no-array-index-key": "off",
      "react-dom/no-missing-button-type": "off",
    },
  },
);
