// Componente para mostrar tarjetas de ejercicios
class ExerciseCard {
  constructor(exerciseData) {
    this.exerciseData = exerciseData;
  }

  render(container) {
    const exerciseCardHtml = `
      <div class="card mb-4 box-shadow">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="my-0 font-weight-normal">${this.exerciseData.name}</h4>
          <small class="text-muted">${this.exerciseData.category}</small>
        </div>
        <div class="card-body">
          <h5 class="card-title">Dificultad: ${this.exerciseData.difficulty}</h5>
          <p class="card-text">${this.exerciseData.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-sm btn-outline-secondary view-details">Ver Detalles</button>
            <small class="text-muted">${this.exerciseData.duration} minutos</small>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += exerciseCardHtml;

    // Agregar evento al botón de ver detalles
    const viewDetailsBtn = container.querySelector('.view-details');
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', () => {
        // Redirigir a la página de detalles del ejercicio
        window.location.href = `/admin/exercise-details.html?id=${this.exerciseData.id}`;
      });
    }
  }
}

// Exportar la clase para que pueda ser usada en otros archivos
window.ExerciseCard = ExerciseCard;