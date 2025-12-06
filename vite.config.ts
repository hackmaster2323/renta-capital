import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Casting process to any to avoid TypeScript errors in some environments
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Prioridad: 
  // 1. process.env.API_KEY (Variables de entorno del sistema/Netlify CI)
  // 2. env.API_KEY (Archivo .env local cargado por Vite)
  // 3. Fallback (Clave hardcodeada)
  const apiKey = process.env.API_KEY || env.API_KEY || "AIzaSyCfN6Xq2gdxC8Z1i_ZraMJGdwpJbKCYMm4";

  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY for the Gemini SDK
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});