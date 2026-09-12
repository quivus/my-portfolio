import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "html-title",
      transformIndexHtml(html) {
        const title = mode === "production" ? "Quivus" : "Rajiemae Villa";
        return html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      },
    },
  ],
}));
