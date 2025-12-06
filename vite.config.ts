import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Usamos la key del entorno si existe, si no, usamos la proporcionada por el usuario
  // para asegurar que la build funcione inmediatamente.
  const apiKey = env.API_KEY || "AIzaSyCfN6Xq2gdxC8Z1i_ZraMJGdwpJbKCYMm4";

  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY for the Gemini SDK
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});