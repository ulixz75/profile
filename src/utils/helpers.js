// Helpers generales para la aplicación
class Helpers {
  // Formatear fecha para mostrar en la UI
  format_date(date_string) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date_string).toLocaleDateString(undefined, options);
  }

  // Formatear fecha y hora para mostrar en la UI
  format_datetime(date_string) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date_string).toLocaleDateString(undefined, options);
  }

  // Generar un ID único simple
  generate_id() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Mostrar mensaje de alerta
  show_alert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.prepend(alert);

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      const alertInstance = new bootstrap.Alert(alert);
      alertInstance.close();
    }, 5000);
  }
}

// Crear una instancia de helpers
const helpers = new Helpers();

// Exportar los helpers para que puedan ser usados en otros archivos
window.Helpers = Helpers;
window.helpers = helpers;