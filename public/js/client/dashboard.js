// JavaScript para el dashboard del cliente
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si el usuario está autenticado y es cliente
  authService.getSession()
    .then(session => {
      if (!session) {
        // Usuario no está autenticado, redirigir al inicio de sesión
        window.location.href = '/index.html';
        return;
      }

      const userType = session.user.user_metadata.user_type;
      if (userType !== 'client') {
        // Usuario no es cliente, redirigir al dashboard de administrador
        window.location.href = '/admin/dashboard.html';
        return;
      }

      // Usuario es cliente, cargar los datos del dashboard
      loadClientDashboardData(session.user.id);
    })
    .catch(error => {
      console.error('Error al verificar sesión:', error);
      helpers.show_alert('Error al verificar sesión. Por favor, inicia sesión nuevamente.', 'danger');
      window.location.href = '/index.html';
    });

  // Función para cargar los datos del dashboard del cliente
  async function loadClientDashboardData(clientId) {
    try {
      // Obtener progreso del cliente
      const progressData = await progressService.getProgressByClient(clientId);

      // Obtener ejercicios asignados
      const assignedExercises = await getAssignedExercises(clientId);

      // Obtener mensajes del entrenador
      const messages = await messagesService.getMessagesByUser(clientId);

      // Renderizar gráficos de progreso
      renderProgressCharts(progressData);

      // Renderizar ejercicios asignados
      renderAssignedExercises(assignedExercises);

      // Renderizar mensajes
      renderClientMessages(messages);
    } catch (error) {
      console.error('Error al cargar datos del dashboard del cliente:', error);
      helpers.show_alert('Error al cargar datos del dashboard. Por favor, inténtalo de nuevo.', 'danger');
    }
  }

  // Función para obtener ejercicios asignados al cliente
  async function getAssignedExercises(clientId) {
    try {
      // En una implementación real, esto se haría mediante una relación en la base de datos
      // Aquí se simula con datos de ejemplo
      return [
        {
          id: 'ex1',
          name: 'Flexiones de Pecho',
          category: 'casa',
          difficulty: 'principiante',
          description: 'Ejercicio básico para fortalecer el pecho.',
          duration: 10,
          sets: 3,
          reps: 12,
          videoUrl: 'https://www.youtube.com/embed/abc123',
          imageUrl: 'https://example.com/exercises/push-ups.jpg'
        },
        {
          id: 'ex2',
          name: 'Plancha',
          category: 'casa',
          difficulty: 'principiante',
          description: 'Ejercicio para fortalecer el core.',
          duration: 5,
          sets: 3,
          reps: '60 segundos',
          videoUrl: 'https://www.youtube.com/embed/def456',
          imageUrl: 'https://example.com/exercises/plank.jpg'
        }
      ];
    } catch (error) {
      console.error('Error al obtener ejercicios asignados:', error);
      throw error;
    }
  }

  // Función para renderizar gráficos de progreso
  function renderProgressCharts(progressData) {
    const progressChartsContainer = document.getElementById('progress-charts');
    progressChartsContainer.innerHTML = '';

    if (progressData.length === 0) {
      progressChartsContainer.innerHTML = '<p class="text-muted">Aún no hay datos de progreso.</p>';
      return;
    }

    // Crear un gráfico para cada métrica
    const metrics = ['weight', 'body_fat', 'muscle_mass'];
    const metricLabels = {
      'weight': 'Peso (kg)',
      'body_fat': 'Porcentaje de Grasa',
      'muscle_mass': 'Masa Muscular'
    };

    metrics.forEach(metric => {
      const chartData = progressService.prepareChartData(progressData, metric);
      
      const chartContainer = document.createElement('div');
      chartContainer.className = 'mt-4';
      progressChartsContainer.appendChild(chartContainer);
      
      const chartTitle = document.createElement('h3');
      chartTitle.className = 'text-lg font-semibold mb-2';
      chartTitle.textContent = metricLabels[metric];
      chartContainer.appendChild(chartTitle);
      
      const progressChart = new ProgressChart(chartData);
      progressChart.render(chartContainer);
    });
  }

  // Función para renderizar ejercicios asignados
  function renderAssignedExercises(exercises) {
    const assignedExercisesContainer = document.getElementById('assigned-exercises');
    assignedExercisesContainer.innerHTML = '';

    if (exercises.length === 0) {
      assignedExercisesContainer.innerHTML = '<p class="text-muted">No hay ejercicios asignados.</p>';
      return;
    }

    exercises.forEach(exercise => {
      const exerciseCard = document.createElement('div');
      exerciseCard.className = 'card mb-3';
      assignedExercisesContainer.appendChild(exerciseCard);
      
      exerciseCard.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${exercise.imageUrl}" class="img-fluid rounded-start" alt="${exercise.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${exercise.name}</h5>
              <p class="card-text">${exercise.description}</p>
              <p class="card-text"><strong>Dificultad:</strong> ${exercise.difficulty}</p>
              <p class="card-text"><strong>Sets/Repeticiones:</strong> ${exercise.sets} sets de ${exercise.reps}</p>
              <p class="card-text"><strong>Duración:</strong> ${exercise.duration} minutos</p>
              <a href="${exercise.videoUrl}" class="btn btn-primary" target="_blank">Ver Video</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  // Función para renderizar mensajes del entrenador
  function renderClientMessages(messages) {
    const clientMessagesContainer = document.getElementById('client-messages');
    clientMessagesContainer.innerHTML = '';

    if (messages.length === 0) {
      clientMessagesContainer.innerHTML = '<p class="text-muted">No hay mensajes del entrenador.</p>';
      return;
    }

    messages.forEach(message => {
      const messageCard = new MessageCard({
        id: message.id,
        sender: message.sender_name,
        content: message.content,
        date: helpers.format_datetime(message.created_at),
        read: message.read
      });

      messageCard.render(clientMessagesContainer);
    });
  }
});