import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno locales si existen (.env)
  // Casting process a 'any' para evitar errores de TS si el entorno es estricto
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Lógica de selección de API Key:
  // 1. process.env.API_KEY: Variable definida en el sistema (Panel de Netlify / CI)
  // 2. env.API_KEY: Variable definida en archivo .env local
  // 3. String vacío fallback
  const apiKey = process.env.API_KEY || env.API_KEY || "";

  return {
    plugins: [react()],
    define: {
      // Reemplaza 'process.env.API_KEY' en el código del cliente por el valor real durante el build
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});