import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    dir: "./src",
    include: ["**/*.{test,spec}.ts"],
    environment: "node",
  },
});
