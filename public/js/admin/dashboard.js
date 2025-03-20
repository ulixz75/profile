// JavaScript para el dashboard del administrador
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si el usuario está autenticado y es administrador
  authService.getSession()
    .then(session => {
      if (!session) {
        // Usuario no está autenticado, redirigir al inicio de sesión
        window.location.href = '/index.html';
        return;
      }

      const userType = session.user.user_metadata.user_type;
      if (userType !== 'admin') {
        // Usuario no es administrador, redirigir al dashboard de cliente
        window.location.href = '/client/dashboard.html';
        return;
      }

      // Usuario es administrador, cargar los datos del dashboard
      loadDashboardData();
    })
    .catch(error => {
      console.error('Error al verificar sesión:', error);
      helpers.show_alert('Error al verificar sesión. Por favor, inicia sesión nuevamente.', 'danger');
      window.location.href = '/index.html';
    });

  // Función para cargar los datos del dashboard
  async function loadDashboardData() {
    try {
      // Obtener clientes
      const clients = await clientsService.getAllClients();

      // Obtener ejercicios
      const exercises = await exercisesService.getAllExercises();

      // Obtener mensajes
      const messages = await messagesService.getMessagesByUser(session.user.id);

      // Renderizar clientes
      renderClients(clients);

      // Renderizar ejercicios
      renderExercises(exercises);

      // Renderizar mensajes
      renderMessages(messages);

      // Agregar eventos a los botones
      addEventListeners();
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      helpers.show_alert('Error al cargar datos del dashboard. Por favor, inténtalo de nuevo.', 'danger');
    }
  }

  // Función para renderizar clientes
  function renderClients(clients) {
    const clientsListContainer = document.getElementById('clients-list');
    clientsListContainer.innerHTML = '';

    if (clients.length === 0) {
      clientsListContainer.innerHTML = '<p class="text-muted">No hay clientes registrados.</p>';
      return;
    }

    clients.forEach(client => {
      const clientCard = new ClientCard({
        id: client.id,
        name: client.name,
        email: client.email,
        progress: client.progress || 0,
        description: client.description || 'Sin descripción',
        lastUpdated: helpers.format_date(client.updated_at)
      });

      clientCard.render(clientsListContainer);
    });
  }

  // Función para renderizar ejercicios
  function renderExercises(exercises) {
    const exercisesListContainer = document.getElementById('exercises-list');
    exercisesListContainer.innerHTML = '';

    if (exercises.length === 0) {
      exercisesListContainer.innerHTML = '<p class="text-muted">No hay ejercicios registrados.</p>';
      return;
    }

    exercises.forEach(exercise => {
      const exerciseCard = new ExerciseCard({
        id: exercise.id,
        name: exercise.name,
        category: exercise.category,
        difficulty: exercise.difficulty,
        description: exercise.description,
        duration: exercise.duration
      });

      exerciseCard.render(exercisesListContainer);
    });
  }

  // Función para renderizar mensajes
  function renderMessages(messages) {
    const messagesListContainer = document.getElementById('messages-list');
    messagesListContainer.innerHTML = '';

    if (messages.length === 0) {
      messagesListContainer.innerHTML = '<p class="text-muted">No hay mensajes recientes.</p>';
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

      messageCard.render(messagesListContainer);
    });
  }

  // Función para agregar eventos a los botones
  function addEventListeners() {
    // Botón para añadir cliente
    const addClientBtn = document.getElementById('add-client-btn');
    if (addClientBtn) {
      addClientBtn.addEventListener('click', () => {
        window.location.href = '/admin/client-profile.html?new=true';
      });
    }

    // Botón para añadir ejercicio
    const addExerciseBtn = document.getElementById('add-exercise-btn');
    if (addExerciseBtn) {
      addExerciseBtn.addEventListener('click', () => {
        window.location.href = '/admin/exercise-details.html?new=true';
      });
    }
  }
});