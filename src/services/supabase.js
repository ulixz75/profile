// Configuración de Supabase
const supabaseUrl = 'TU_URL_DE_SUPABASE';
const supabaseKey = 'TU_CLAVE_DE_SUPABASE';

// Inicializar Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Exportar la instancia de Supabase
window.supabase = supabase;
