// Archivo principal de JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si el usuario está autenticado
  authService.getSession()
    .then(session => {
      if (session) {
        // Usuario está autenticado, redirigir al dashboard correspondiente
        const userType = session.user.user_metadata.user_type;
        
        if (userType === 'admin') {
          window.location.href = '/admin/dashboard.html';
        } else if (userType === 'client') {
          window.location.href = '/client/dashboard.html';
        }
      } else {
        // Usuario no está autenticado, mostrar el contenedor de autenticación
        renderAuthContainer();
      }
    })
    .catch(error => {
      console.error('Error al verificar sesión:', error);
      renderAuthContainer();
    });

  // Función para renderizar el contenedor de autenticación
  function renderAuthContainer() {
    const authContainer = document.getElementById('auth-container');
    
    // HTML para el contenedor de autenticación
    const authHtml = `
      <div class="tab-content" id="authTabsContent">
        <div class="tab-pane fade show active" id="login-tab-pane" role="tabpanel" aria-labelledby="login-tab">
          ${renderLoginTab()}
        </div>
        <div class="tab-pane fade" id="register-tab-pane" role="tabpanel" aria-labelledby="register-tab">
          ${renderRegisterTab()}
        </div>
      </div>
      <ul class="nav nav-tabs" id="authTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login-tab-pane" type="button" role="tab">Iniciar Sesión</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register-tab-pane" type="button" role="tab">Registrarse</button>
        </li>
      </ul>
    `;

    authContainer.innerHTML = authHtml;

    // Inicializar los tabs de Bootstrap
    const loginTab = new bootstrap.Tab(document.getElementById('login-tab'));
    const registerTab = new bootstrap.Tab(document.getElementById('register-tab'));

    // Agregar eventos a los botones de inicio de sesión con proveedores externos
    document.querySelectorAll('.provider-login-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const provider = button.dataset.provider;
        try {
          await authService.loginWithProvider(provider);
          // Redirigir a la página de inicio después de un breve retraso
          setTimeout(() => {
            window.location.href = '/index.html';
          }, 1000);
        } catch (error) {
          helpers.show_alert(`Error al iniciar sesión: ${error.message}`, 'danger');
        }
      });
    });

    // Agregar eventos a los formularios de inicio de sesión y registro
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      try {
        await authService.loginWithEmail(email, password);
        // Redirigir a la página de inicio después de un breve retraso
        setTimeout(() => {
          window.location.href = '/index.html';
        }, 1000);
      } catch (error) {
        helpers.show_alert(`Error al iniciar sesión: ${error.message}`, 'danger');
      }
    });

    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const userType = document.getElementById('register-user-type').value;
      
      try {
        await authService.signUpWithEmail(email, password, userType);
        helpers.show_alert('Registro exitoso. Por favor, verifica tu correo electrónico.', 'success');
        // Cambiar a la pestaña de inicio de sesión
        loginTab.show();
      } catch (error) {
        helpers.show_alert(`Error al registrarse: ${error.message}`, 'danger');
      }
    });
  }

  // Función para renderizar la pestaña de inicio de sesión
  function renderLoginTab() {
    return `
      <form id="login-form" class="space-y-4">
        <div class="form-floating">
          <input type="email" class="form-control" id="login-email" placeholder="name@example.com" required>
          <label for="login-email">Correo Electrónico</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="login-password" placeholder="Password" required>
          <label for="login-password">Contraseña</label>
        </div>
        <button type="submit" class="w-100 btn btn-lg btn-primary">Iniciar Sesión</button>
        <div class="divider text-muted">O</div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-outline-primary me-2 provider-login-btn" data-provider="google">
            <i class="fab fa-google me-2"></i>Iniciar con Google
          </button>
          <button type="button" class="btn btn-outline-dark me-2 provider-login-btn" data-provider="apple">
            <i class="fab fa-apple me-2"></i>Iniciar con Apple
          </button>
          <button type="button" class="btn btn-outline-primary me-2 provider-login-btn" data-provider="microsoft">
            <i class="fab fa-microsoft me-2"></i>Iniciar con Microsoft
          </button>
          <button type="button" class="btn btn-outline-primary provider-login-btn" data-provider="facebook">
            <i class="fab fa-facebook me-2"></i>Iniciar con Facebook
          </button>
        </div>
      </form>
    `;
  }

  // Función para renderizar la pestaña de registro
  function renderRegisterTab() {
    return `
      <form id="register-form" class="space-y-4">
        <div class="form-floating">
          <input type="email" class="form-control" id="register-email" placeholder="name@example.com" required>
          <label for="register-email">Correo Electrónico</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="register-password" placeholder="Password" required>
          <label for="register-password">Contraseña</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" id="register-user-type-admin" name="user_type" value="admin" required>
          <label class="form-check-label" for="register-user-type-admin">Soy Entrenador</label>
        </div>
        <div class="form-check">
          <input type="radio" class="form-check-input" id="register-user-type-client" name="user_type" value="client" required>
          <label class="form-check-label" for="register-user-type-client">Soy Cliente</label>
        </div>
        <button type="submit" class="w-100 btn btn-lg btn-success">Registrarse</button>
      </form>
    `;
  }
});