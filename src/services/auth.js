// Servicio de autenticación para la aplicación
class AuthService {
  constructor() {
    this.supabase = supabase;
  }

  async loginWithEmail(email, password) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async signUpWithEmail(email, password, userType) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            // Otros datos del usuario que queramos guardar
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error;
    }
  }

  async loginWithProvider(provider) {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al iniciar sesión con proveedor externo:', error);
      throw error;
    }
  }

  async logout() {
    try {
      const { error } = await this.supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      // Redirigir al inicio de sesión
      window.location.href = '/index.html';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  async getUser() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();

      if (error) {
        throw new Error(error.message);
      }

      return user;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  async getSession() {
    try {
      const { data: session, error } = await this.supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      return session;
    } catch (error) {
      console.error('Error al obtener sesión:', error);
      throw error;
    }
  }
}

// Crear una instancia del servicio de autenticación
const authService = new AuthService();

// Exportar el servicio para que pueda ser usado en otros archivos
window.AuthService = AuthService;
window.authService = authService;