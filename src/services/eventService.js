import { localDataService } from './localDataService';

export const eventService = {
  async getAll() {
    const data = await localDataService.getEvents();
    return { data };
  },
  async getById(id) {
    const data = await localDataService.getEventById(id);
    return { data };
  },
  async create(eventData) {
    const data = await localDataService.addEvent(eventData);
    return { data };
  },
  async update(id, eventData) {
    const data = await localDataService.updateEvent(id, eventData);
    return { data };
  },
  async delete(id) {
    await localDataService.deleteEvent(id);
    return { data: true };
  },
  async filterByDate(startDate, endDate) {
    const events = await localDataService.getEvents();
    const data = events.filter((evt) => {
      const ts = new Date(evt.date).getTime();
      return (!startDate || ts >= new Date(startDate).getTime()) && (!endDate || ts <= new Date(endDate).getTime());
    });
    return { data };
  },
  async getStats() {
    const events = await localDataService.getEvents();
    return { data: { total: events.length } };
  },
  async search(query) {
    const events = await localDataService.getEvents();
    const q = query?.toLowerCase?.() || '';
    const data = events.filter((evt) => evt.title.toLowerCase().includes(q) || evt.description.toLowerCase().includes(q));
    return { data };
  }
};
