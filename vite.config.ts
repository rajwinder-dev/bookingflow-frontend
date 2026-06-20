import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., 'development', 'production')
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    clearScreen: false,
    server: {
      proxy: {
        "/api": {
          // Use the loaded env variable here
          target: env.VITE_API_URL || "http://localhost:3000",
          changeOrigin: true,
          secure: false,
          // Optional: removes/rewrites the "/api" prefix before sending the request to the backend
          // rewrite: (path) => path.replace(/^\/api/, ''), 
        },
      },
    },
  };
});
