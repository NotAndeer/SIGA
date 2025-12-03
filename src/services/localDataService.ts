import { seedMembers, seedEvents, seedTransactions } from '../data/seedData';
import { EventItem, Member, TransactionItem } from '../types/models';

const STORAGE_KEY = 'siga_offline_data';

type StoreState = {
  members: Member[];
  events: EventItem[];
  transactions: TransactionItem[];
};

let memoryStore: StoreState | null = null;

const clone = <T,>(data: T): T => JSON.parse(JSON.stringify(data));

const getInitialData = (): StoreState => ({
  members: seedMembers,
  events: seedEvents,
  transactions: seedTransactions,
});

const getStore = (): StoreState => {
  if (typeof window === 'undefined' || !window.localStorage) {
    if (!memoryStore) memoryStore = getInitialData();
    return memoryStore;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const initial = getInitialData();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(saved) as StoreState;
  } catch (error) {
    console.warn('No se pudo leer el almacenamiento local, reestableciendo datos de ejemplo');
    const initial = getInitialData();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
};

const persist = (data: StoreState) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    memoryStore = data;
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const generateId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && (crypto as Crypto).randomUUID) {
    return (crypto as Crypto).randomUUID();
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 6)}`;
};

export const localDataService = {
  // Miembros
  async getMembers(): Promise<Member[]> {
    const data = getStore();
    return clone<Member[]>(data.members);
  },
  async addMember(member: Partial<Member>): Promise<Member> {
    const data = getStore();
    const newMember: Member = { ...(member as Member), id: member.id || generateId('m') };
    data.members = [...data.members, newMember];
    persist(data);
    return clone<Member>(newMember);
  },
  async updateMember(id: string, member: Partial<Member>): Promise<Member | undefined> {
    const data = getStore();
    data.members = data.members.map((m) => (m.id === id ? { ...m, ...member, id } : m));
    persist(data);
    return clone<Member | undefined>(data.members.find((m) => m.id === id));
  },
  async deleteMember(id: string): Promise<boolean> {
    const data = getStore();
    data.members = data.members.filter((m) => m.id !== id);
    persist(data);
    return true;
  },
  async getMemberById(id: string): Promise<Member | undefined> {
    const data = getStore();
    return clone<Member | undefined>(data.members.find((m) => m.id === id));
  },

  // Eventos
  async getEvents(): Promise<EventItem[]> {
    const data = getStore();
    return clone<EventItem[]>(data.events);
  },
  async addEvent(event: Partial<EventItem>): Promise<EventItem> {
    const data = getStore();
    const newEvent: EventItem = { ...(event as EventItem), id: event.id || generateId('e') };
    data.events = [...data.events, newEvent];
    persist(data);
    return clone<EventItem>(newEvent);
  },
  async updateEvent(id: string, event: Partial<EventItem>): Promise<EventItem | undefined> {
    const data = getStore();
    data.events = data.events.map((evt: any) => ((evt.id || evt._id) === id ? { ...evt, ...event, id } : evt));
    persist(data);
    return clone<EventItem | undefined>(data.events.find((evt: any) => (evt.id || evt._id) === id));
  },
  async deleteEvent(id: string): Promise<boolean> {
    const data = getStore();
    data.events = data.events.filter((evt: any) => (evt.id || evt._id) !== id);
    persist(data);
    return true;
  },
  async getEventById(id: string): Promise<EventItem | undefined> {
    const data = getStore();
    return clone<EventItem | undefined>(data.events.find((evt: any) => (evt.id || evt._id) === id));
  },

  // Finanzas
  async getTransactions(): Promise<TransactionItem[]> {
    const data = getStore();
    return clone<TransactionItem[]>(data.transactions);
  },
  async addTransaction(tx: Partial<TransactionItem>): Promise<TransactionItem> {
    const data = getStore();
    const newTx: TransactionItem = { ...(tx as TransactionItem), id: tx.id || generateId('t') };
    data.transactions = [newTx, ...data.transactions];
    persist(data);
    return clone<TransactionItem>(newTx);
  },
  async updateTransaction(id: string, updates: Partial<TransactionItem>): Promise<TransactionItem | undefined> {
    const data = getStore();
    data.transactions = data.transactions.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx));
    persist(data);
    return clone<TransactionItem | undefined>(data.transactions.find((tx) => tx.id === id));
  },
  async deleteTransaction(id: string): Promise<boolean> {
    const data = getStore();
    data.transactions = data.transactions.filter((tx) => tx.id !== id);
    persist(data);
    return true;
  }
};
