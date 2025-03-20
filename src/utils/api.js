// Utilidades para integración con APIs externas
class ApiUtils {
  constructor() {
    // Aquí se podrían configurar las URLs base de las APIs
    this.exerciseApiBaseUrl = 'https://api.example.com/exercises';
  }

  async fetchExercises(category) {
    try {
      // En una implementación real, se haría una solicitud a la API
      // Por ahora, devolvemos datos de ejemplo
      return this.getExampleExercises(category);
    } catch (error) {
      console.error('Error al obtener ejercicios de la API:', error);
      throw error;
    }
  }

  getExampleExercises(category) {
    // Datos de ejemplo para diferentes categorías de ejercicios
    const exercises = {
      'gimnasio': [
        {
          id: 'ex1',
          name: 'Press de Banca',
          category: 'gimnasio',
          difficulty: 'medio',
          description: 'Ejercicio compuesto que trabaja principalmente el pecho, tríceps y hombros.',
          duration: 15,
          videoUrl: 'https://www.youtube.com/embed/abc123',
          imageUrl: 'https://example.com/exercises/bench-press.jpg'
        },
        {
          id: 'ex2',
          name: 'Sentadillas con Barra',
          category: 'gimnasio',
          difficulty: 'avanzado',
          description: 'Ejercicio fundamental para fortalecer los cuádriceps, glúteos y isquiotibiales.',
          duration: 20,
          videoUrl: 'https://www.youtube.com/embed/def456',
          imageUrl: 'https://example.com/exercises/squat.jpg'
        }
      ],
      'casa': [
        {
          id: 'ex3',
          name: 'Flexiones de Pecho',
          category: 'casa',
          difficulty: 'principiante',
          description: 'Ejercicio básico que se puede hacer en cualquier lugar para fortalecer el pecho y tríceps.',
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/ghi789',
          imageUrl: 'https://example.com/exercises/push-ups.jpg'
        },
        {
          id: 'ex4',
          name: 'Plancha',
          category: 'casa',
          difficulty: 'principiante',
          description: 'Ejercicio isométrico excelente para fortalecer el core.',
          duration: 5,
          videoUrl: 'https://www.youtube.com/embed/jkl012',
          imageUrl: 'https://example.com/exercises/plank.jpg'
        }
      ],
      'bandas': [
        {
          id: 'ex5',
          name: 'Remo con Banda',
          category: 'bandas',
          difficulty: 'medio',
          description: 'Ejercicio para fortalecer la espalda usando bandas de resistencia.',
          duration: 12,
          videoUrl: 'https://www.youtube.com/embed/mno345',
          imageUrl: 'https://example.com/exercises/band-row.jpg'
        },
        {
          id: 'ex6',
          name: 'Press de Hombro con Banda',
          category: 'bandas',
          difficulty: 'medio',
          description: 'Ejercicio para fortalecer los hombros usando bandas de resistencia.',
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/pqr678',
          imageUrl: 'https://example.com/exercises/band-shoulder-press.jpg'
        }
      ]
    };

    return exercises[category] || [];
  }
}

// Crear una instancia de las utilidades de API
const apiUtils = new ApiUtils();

// Exportar las utilidades de API para que puedan ser usadas en otros archivos
window.ApiUtils = ApiUtils;
window.apiUtils = apiUtils;