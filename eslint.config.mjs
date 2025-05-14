import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ['error', 'never'],                  
      'no-console': ['warn', { allow: ['warn', 'error'] }],  
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    }
  },
  tseslint.configs.recommended,
])
