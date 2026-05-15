import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      exclude: ["node_modules", "dist", "prisma"],
    },
    // Separate pools for unit vs integration so they don't share state
    poolOptions: {
      threads: { singleThread: true },
    },
  },
});
