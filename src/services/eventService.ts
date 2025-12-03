import { EventItem } from '../types/models';
import { localDataService } from './localDataService';

export const eventService = {
  async getAll(): Promise<{ data: EventItem[] }> {
    const data = await localDataService.getEvents();
    return { data };
  },
  async getById(id: string): Promise<{ data: EventItem | undefined }> {
    const data = await localDataService.getEventById(id);
    return { data };
  },
  async create(eventData: Partial<EventItem>): Promise<{ data: EventItem }> {
    const data = await localDataService.addEvent(eventData);
    return { data };
  },
  async update(id: string, eventData: Partial<EventItem>): Promise<{ data: EventItem | undefined }> {
    const data = await localDataService.updateEvent(id, eventData);
    return { data };
  },
  async delete(id: string): Promise<{ data: boolean }> {
    await localDataService.deleteEvent(id);
    return { data: true };
  },
  async filterByDate(startDate?: string, endDate?: string): Promise<{ data: EventItem[] }> {
    const events = await localDataService.getEvents();
    const data = events.filter((evt) => {
      const ts = new Date(evt.date).getTime();
      return (!startDate || ts >= new Date(startDate).getTime()) && (!endDate || ts <= new Date(endDate).getTime());
    });
    return { data };
  },
  async getStats(): Promise<{ data: { total: number } }> {
    const events = await localDataService.getEvents();
    return { data: { total: events.length } };
  },
  async search(query: string): Promise<{ data: EventItem[] }> {
    const events = await localDataService.getEvents();
    const q = query?.toLowerCase?.() || '';
    const data = events.filter((evt) => evt.title.toLowerCase().includes(q) || evt.description.toLowerCase().includes(q));
    return { data };
  }
};
