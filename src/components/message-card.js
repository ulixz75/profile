// Componente para mostrar tarjetas de mensajes
class MessageCard {
  constructor(messageData) {
    this.messageData = messageData;
  }

  render(container) {
    const messageCardHtml = `
      <div class="card mb-4 box-shadow">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="my-0 font-weight-normal">${this.messageData.sender}</h4>
          <small class="text-muted">${this.messageData.date}</small>
        </div>
        <div class="card-body">
          <p class="card-text">${this.messageData.content}</p>
          ${this.messageData.read ? '' : '<span class="badge bg-primary">Nuevo</span>'}
        </div>
      </div>
    `;

    container.innerHTML += messageCardHtml;

    // Agregar evento al hacer clic en la tarjeta
    const card = container.lastElementChild;
    if (card) {
      card.addEventListener('click', () => {
        // Redirigir a la vista de mensaje completo
        window.location.href = `/messages/view.html?id=${this.messageData.id}`;
      });
    }
  }
}

// Exportar la clase para que pueda ser usada en otros archivos
window.MessageCard = MessageCard;