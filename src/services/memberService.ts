import { Member } from '../types/models';
import { localDataService } from './localDataService';

export const memberService = {
  async getAll(): Promise<{ data: Member[] }> {
    const data = await localDataService.getMembers();
    return { data };
  },
  async getById(id: string): Promise<{ data: Member | undefined }> {
    const data = await localDataService.getMemberById(id);
    return { data };
  },
  async create(memberData: Partial<Member>): Promise<{ data: Member }> {
    const data = await localDataService.addMember(memberData);
    return { data };
  },
  async update(id: string, memberData: Partial<Member>): Promise<{ data: Member | undefined }> {
    const data = await localDataService.updateMember(id, memberData);
    return { data };
  },
  async delete(id: string): Promise<{ data: boolean }> {
    await localDataService.deleteMember(id);
    return { data: true };
  },
  async getStats(): Promise<{ data: { total: number; active: number; inactive: number } }> {
    const all = await localDataService.getMembers();
    const active = all.filter((m) => (m.status || 'active') === 'active').length;
    return { data: { total: all.length, active, inactive: all.length - active } };
  },
  async search(query: string): Promise<{ data: Member[] }> {
    const all = await localDataService.getMembers();
    const q = query?.toLowerCase?.() || '';
    const data = all.filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    return { data };
  },
  async exportToExcel(): Promise<{ data: Member[] }> {
    const all = await localDataService.getMembers();
    return { data: all };
  }
};
