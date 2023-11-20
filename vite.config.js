import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        Menu: resolve(__dirname, "Menupage/Menu.html"),
        ContactUs: resolve(__dirname, "ContactUs/ContactUs.html"),
      },
    },
  },
});
