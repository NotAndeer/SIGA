import { localDataService } from './localDataService';

export const transactionService = {
  async getAll() {
    const data = await localDataService.getTransactions();
    return { data };
  },
  async create(payload) {
    const data = await localDataService.addTransaction(payload);
    return { data };
  },
  async update(id, updates) {
    const data = await localDataService.updateTransaction(id, updates);
    return { data };
  },
  async delete(id) {
    await localDataService.deleteTransaction(id);
    return { data: true };
  }
};
