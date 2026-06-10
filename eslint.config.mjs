import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  // Patterns NON ancrés (**/…) : ces dossiers générés sont ignorés quel que
  // soit le base path d'ESLint. Avec `.next/**` ancré à la racine, certains
  // setups (ex. git worktree) ne matchent pas et ESLint linte tout le build
  // généré → des milliers de faux problèmes.
  globalIgnores([
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/next-env.d.ts",
  ]),
]);

export default eslintConfig;
