// Servicio para gestionar clientes en Supabase
class ClientsService {
  constructor() {
    this.supabase = supabase;
  }

  async getAllClients() {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      throw error;
    }
  }

  async getClientById(id) {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener cliente:', error);
      throw error;
    }
  }

  async createClient(clientData) {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .insert([clientData])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw error;
    }
  }

  async updateClient(id, clientData) {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw error;
    }
  }

  async deleteClient(id) {
    try {
      const { error } = await this.supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      throw error;
    }
  }
}

// Crear una instancia del servicio de clientes
const clientsService = new ClientsService();

// Exportar el servicio para que pueda ser usado en otros archivos
window.ClientsService = ClientsService;
window.clientsService = clientsService;