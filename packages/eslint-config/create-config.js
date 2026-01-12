import antfu from "@antfu/eslint-config";

export default function createConfig(options, ...userConfigs) {
  return antfu(
    {
      type: "app",
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
      ignores: ["**/*.d.ts"],
      ...options,
    },
    {
      rules: {
        "ts/no-redeclare": "off",
        "ts/consistent-type-definitions": ["error", "type"],
        "ts/no-empty-object-type": ["warn"],
        "no-console": ["warn"],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": [
          "error",
          {
            tsconfigRootDir: ".",
          },
        ],
        "unicorn/filename-case": [
          "error",
          {
            case: "kebabCase",
            ignore: ["README.md", "\\.json$"],
          },
        ],
      },
    },
    ...userConfigs,
  );
}
