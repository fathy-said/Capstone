import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({}),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    }),
  ],
  server: {
    port: 5050,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
