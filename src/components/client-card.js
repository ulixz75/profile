// Componente para mostrar tarjetas de clientes
class ClientCard {
  constructor(clientData) {
    this.clientData = clientData;
  }

  render(container) {
    const clientCardHtml = `
      <div class="card mb-4 box-shadow">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="my-0 font-weight-normal">${this.clientData.name}</h4>
          <small class="text-muted">${this.clientData.email}</small>
        </div>
        <div class="card-body">
          <h5 class="card-title">Progreso</h5>
          <div class="progress mb-3">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${this.clientData.progress}%"></div>
          </div>
          <p class="card-text">${this.clientData.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-sm btn-outline-secondary view-details">Ver Detalles</button>
            <small class="text-muted">${this.clientData.lastUpdated}</small>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += clientCardHtml;

    // Agregar evento al botón de ver detalles
    const viewDetailsBtn = container.querySelector('.view-details');
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', () => {
        // Redirigir a la página de perfil del cliente
        window.location.href = `/admin/client-profile.html?id=${this.clientData.id}`;
      });
    }
  }
}

// Exportar la clase para que pueda ser usada en otros archivos
window.ClientCard = ClientCard;