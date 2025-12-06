import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zefqxjiifrjswzlplnua.supabase.co';
const supabaseKey = 'sb_publishable_lMDT-yFoLeA2-UBgAYTpiQ_UedIVsB-';

let supabaseInstance = null;

try {
  // Verificación básica para evitar crash si las credenciales están vacías o son inválidas
  if (supabaseUrl && supabaseKey) {
    // Intentamos inicializar. createClient puede lanzar error si la URL no es válida.
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase client initialized.");
  }
} catch (error) {
  console.warn("Supabase initialization warning:", error);
  // La app continuará funcionando en modo "offline" con datos estáticos
}

export const supabase = supabaseInstance;