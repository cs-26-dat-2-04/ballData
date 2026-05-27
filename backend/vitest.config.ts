import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["src/__tests__/unit/**/*.test.js"],
          environment: "node",
          globals: true,
          isolate: true,
        },
      },
      {
        test: {
          name: "integration",
          include: ["src/__tests__/integration/**/*.test.js"],
          environment: "node",
          globals: true,
          isolate: true,
          fileParallelism: false,
          poolOptions: {
            forks: {
              singleFork: true,
            },
          },
        },
      },
    ],
  },
});
