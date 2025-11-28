import api from './api';

export const memberService = {
  // Obtener todos los miembros
  getAll: (params = {}) => 
    api.get('/members', { params }),

  // Obtener miembro por ID
  getById: (id) => 
    api.get(`/members/${id}`),

  // Crear nuevo miembro
  create: (memberData) => 
    api.post('/members', memberData),

  // Actualizar miembro existente
  update: (id, memberData) => 
    api.put(`/members/${id}`, memberData),

  // Eliminar miembro
  delete: (id) => 
    api.delete(`/members/${id}`),

  // Obtener estadísticas de miembros
  getStats: () => 
    api.get('/members/stats'),

  // Buscar miembros por criterios
  search: (query) => 
    api.get('/members/search', { params: { q: query } }),

  // Exportar miembros a Excel
  exportToExcel: () =>
    api.get('/members/export', { responseType: 'blob' })
};
