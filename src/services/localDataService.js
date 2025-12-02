import { seedMembers, seedEvents, seedTransactions } from '../data/seedData';

const STORAGE_KEY = 'siga_offline_data';
let memoryStore = null;

const clone = (data) => JSON.parse(JSON.stringify(data));

const getInitialData = () => ({
  members: seedMembers,
  events: seedEvents,
  transactions: seedTransactions,
});

const getStore = () => {
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
    return JSON.parse(saved);
  } catch (error) {
    console.warn('No se pudo leer el almacenamiento local, reestableciendo datos de ejemplo');
    const initial = getInitialData();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
};

const persist = (data) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    memoryStore = data;
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const generateId = (prefix) => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 6)}`;
};

export const localDataService = {
  // Miembros
  async getMembers() {
    const data = getStore();
    return clone(data.members);
  },
  async addMember(member) {
    const data = getStore();
    const newMember = { ...member, id: member.id || generateId('m') };
    data.members = [...data.members, newMember];
    persist(data);
    return clone(newMember);
  },
  async updateMember(id, member) {
    const data = getStore();
    data.members = data.members.map((m) => (m.id === id ? { ...m, ...member, id } : m));
    persist(data);
    return clone(data.members.find((m) => m.id === id));
  },
  async deleteMember(id) {
    const data = getStore();
    data.members = data.members.filter((m) => m.id !== id);
    persist(data);
    return true;
  },
  async getMemberById(id) {
    const data = getStore();
    return clone(data.members.find((m) => m.id === id));
  },

  // Eventos
  async getEvents() {
    const data = getStore();
    return clone(data.events);
  },
  async addEvent(event) {
    const data = getStore();
    const newEvent = { ...event, id: event.id || generateId('e') };
    data.events = [...data.events, newEvent];
    persist(data);
    return clone(newEvent);
  },
  async updateEvent(id, event) {
    const data = getStore();
    data.events = data.events.map((evt) => ((evt.id || evt._id) === id ? { ...evt, ...event, id } : evt));
    persist(data);
    return clone(data.events.find((evt) => (evt.id || evt._id) === id));
  },
  async deleteEvent(id) {
    const data = getStore();
    data.events = data.events.filter((evt) => (evt.id || evt._id) !== id);
    persist(data);
    return true;
  },
  async getEventById(id) {
    const data = getStore();
    return clone(data.events.find((evt) => (evt.id || evt._id) === id));
  },

  // Finanzas
  async getTransactions() {
    const data = getStore();
    return clone(data.transactions);
  },
  async addTransaction(tx) {
    const data = getStore();
    const newTx = { ...tx, id: tx.id || generateId('t') };
    data.transactions = [newTx, ...data.transactions];
    persist(data);
    return clone(newTx);
  },
  async updateTransaction(id, updates) {
    const data = getStore();
    data.transactions = data.transactions.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx));
    persist(data);
    return clone(data.transactions.find((tx) => tx.id === id));
  },
  async deleteTransaction(id) {
    const data = getStore();
    data.transactions = data.transactions.filter((tx) => tx.id !== id);
    persist(data);
    return true;
  }
};
