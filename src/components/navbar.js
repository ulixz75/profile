// Componente de navegación para la aplicación
class Navbar {
  constructor(userType) {
    this.userType = userType;
  }

  render(container) {
    const navbarHtml = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-gradient-to-r from-blue-600 to-purple-600">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Entrenador Personal</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              ${this.userType === 'admin' ? `
                <li class="nav-item">
                  <a class="nav-link" href="/admin/dashboard.html">Dashboard</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/admin/clients.html">Clientes</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/admin/exercises.html">Ejercicios</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/admin/nutrition.html">Nutrición</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/admin/messages.html">Mensajes</a>
                </li>
              ` : ''}
              ${this.userType === 'client' ? `
                <li class="nav-item">
                  <a class="nav-link" href="/client/dashboard.html">Dashboard</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/client/profile.html">Perfil</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/client/exercises.html">Ejercicios</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/client/nutrition.html">Nutrición</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/client/messages.html">Mensajes</a>
                </li>
              ` : ''}
            </ul>
            <div class="d-flex">
              <button id="logout-btn" class="btn btn-light">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </nav>
    `;

    container.innerHTML = navbarHtml;

    // Agregar evento al botón de cierre de sesión
    const logoutBtn = container.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AuthService.logout();
      });
    }
  }
}

// Exportar la clase para que pueda ser usada en otros archivos
window.Navbar = Navbar;