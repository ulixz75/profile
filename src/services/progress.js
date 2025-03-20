// Servicio para gestionar el progreso de los clientes en Supabase
class ProgressService {
  constructor() {
    this.supabase = supabase;
  }

  async getProgressByClient(clientId) {
    try {
      const { data, error } = await this.supabase
        .from('progress')
        .select('*')
        .eq('client_id', clientId)
        .order('date', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener progreso del cliente:', error);
      throw error;
    }
  }

  async createProgressEntry(progressData) {
    try {
      const { data, error } = await this.supabase
        .from('progress')
        .insert([progressData])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      console.error('Error al crear entrada de progreso:', error);
      throw error;
    }
  }

  async updateProgressEntry(id, progressData) {
    try {
      const { data, error } = await this.supabase
        .from('progress')
        .update(progressData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al actualizar entrada de progreso:', error);
      throw error;
    }
  }

  async deleteProgressEntry(id) {
    try {
      const { error } = await this.supabase
        .from('progress')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Error al eliminar entrada de progreso:', error);
      throw error;
    }
  }

  // Método para generar datos para gráficos
  prepareChartData(progressData, metric) {
    const labels = [];
    const data = [];

    progressData.forEach(entry => {
      labels.push(new Date(entry.date).toLocaleDateString());
      data.push(entry[metric]);
    });

    return { labels, data, metric };
  }
}

// Crear una instancia del servicio de progreso
const progressService = new ProgressService();

// Exportar el servicio para que pueda ser usado en otros archivos
window.ProgressService = ProgressService;
window.progressService = progressService;