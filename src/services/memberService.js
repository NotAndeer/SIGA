import { localDataService } from './localDataService';

export const memberService = {
  async getAll() {
    const data = await localDataService.getMembers();
    return { data };
  },
  async getById(id) {
    const data = await localDataService.getMemberById(id);
    return { data };
  },
  async create(memberData) {
    const data = await localDataService.addMember(memberData);
    return { data };
  },
  async update(id, memberData) {
    const data = await localDataService.updateMember(id, memberData);
    return { data };
  },
  async delete(id) {
    await localDataService.deleteMember(id);
    return { data: true };
  },
  async getStats() {
    const all = await localDataService.getMembers();
    const active = all.filter((m) => (m.status || 'active') === 'active').length;
    return { data: { total: all.length, active, inactive: all.length - active } };
  },
  async search(query) {
    const all = await localDataService.getMembers();
    const q = query?.toLowerCase?.() || '';
    const data = all.filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    return { data };
  },
  async exportToExcel() {
    const all = await localDataService.getMembers();
    return { data: all };
  }
};
