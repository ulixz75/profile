// Servicio para gestionar ejercicios en Supabase
class ExercisesService {
  constructor() {
    this.supabase = supabase;
  }

  async getAllExercises() {
    try {
      const { data, error } = await this.supabase
        .from('exercises')
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
      throw error;
    }
  }

  async getExerciseById(id) {
    try {
      const { data, error } = await this.supabase
        .from('exercises')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener ejercicio:', error);
      throw error;
    }
  }

  async createExercise(exerciseData) {
    try {
      const { data, error } = await this.supabase
        .from('exercises')
        .insert([exerciseData])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      console.error('Error al crear ejercicio:', error);
      throw error;
    }
  }

  async updateExercise(id, exerciseData) {
    try {
      const { data, error } = await this.supabase
        .from('exercises')
        .update(exerciseData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al actualizar ejercicio:', error);
      throw error;
    }
  }

  async deleteExercise(id) {
    try {
      const { error } = await this.supabase
        .from('exercises')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Error al eliminar ejercicio:', error);
      throw error;
    }
  }

  async getExercisesByCategory(category) {
    try {
      const { data, error } = await this.supabase
        .from('exercises')
        .select('*')
        .eq('category', category);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener ejercicios por categoría:', error);
      throw error;
    }
  }
}

// Crear una instancia del servicio de ejercicios
const exercisesService = new ExercisesService();

// Exportar el servicio para que pueda ser usado en otros archivos
window.ExercisesService = ExercisesService;
window.exercisesService = exercisesService;