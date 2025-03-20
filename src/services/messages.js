// Servicio para gestionar mensajes en Supabase
class MessagesService {
  constructor() {
    this.supabase = supabase;
  }

  async getMessagesByClient(clientId) {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener mensajes del cliente:', error);
      throw error;
    }
  }

  async getMessagesByUser(userId) {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al obtener mensajes del usuario:', error);
      throw error;
    }
  }

  async createMessage(messageData) {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .insert([messageData])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      console.error('Error al crear mensaje:', error);
      throw error;
    }
  }

  async markMessageAsRead(messageId) {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error al marcar mensaje como leído:', error);
      throw error;
    }
  }

  async deleteMessage(messageId) {
    try {
      const { error } = await this.supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      throw error;
    }
  }
}

// Crear una instancia del servicio de mensajes
const messagesService = new MessagesService();

// Exportar el servicio para que pueda ser usado en otros archivos
window.MessagesService = MessagesService;
window.messagesService = messagesService;