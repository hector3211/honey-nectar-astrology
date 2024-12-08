// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  env: {
    schema: {
      SECRET_PLUNK_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      SECRET_HONEY_NECTAR_ASTROLOGY_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
