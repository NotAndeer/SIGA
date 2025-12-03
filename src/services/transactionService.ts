import { TransactionItem } from '../types/models';
import { localDataService } from './localDataService';

export const transactionService = {
  async getAll(): Promise<{ data: TransactionItem[] }> {
    const data = await localDataService.getTransactions();
    return { data };
  },
  async create(payload: Partial<TransactionItem>): Promise<{ data: TransactionItem }> {
    const data = await localDataService.addTransaction(payload);
    return { data };
  },
  async update(id: string, updates: Partial<TransactionItem>): Promise<{ data: TransactionItem | undefined }> {
    const data = await localDataService.updateTransaction(id, updates);
    return { data };
  },
  async delete(id: string): Promise<{ data: boolean }> {
    await localDataService.deleteTransaction(id);
    return { data: true };
  }
};
