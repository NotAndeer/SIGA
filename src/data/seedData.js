export const seedMembers = [
  {
    id: 'm1',
    name: 'María López',
    email: 'maria.lopez@example.com',
    profession: 'Abogada',
    joinDate: '2023-08-15',
    status: 'active'
  },
  {
    id: 'm2',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@example.com',
    profession: 'Ingeniero civil',
    joinDate: '2022-11-03',
    status: 'active'
  },
  {
    id: 'm3',
    name: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    profession: 'Diseñadora',
    joinDate: '2024-02-20',
    status: 'inactive'
  }
];

export const seedEvents = [
  {
    id: 'e1',
    title: 'Asamblea General',
    date: '2024-06-20',
    location: 'Auditorio Central',
    description: 'Revisión de presupuesto y planes anuales',
    capacity: 80,
    status: 'scheduled',
    category: 'general'
  },
  {
    id: 'e2',
    title: 'Taller de formación',
    date: '2024-07-05',
    location: 'Sala 2',
    description: 'Capacitación interna para coordinadores',
    capacity: 40,
    status: 'scheduled',
    category: 'training'
  }
];

export const seedTransactions = [
  { id: 't1', type: 'income', category: 'Cuotas', description: 'Pago mensual', amount: 150000, date: '2024-05-02', status: 'cleared' },
  { id: 't2', type: 'expense', category: 'Logística', description: 'Alquiler de salón', amount: 80000, date: '2024-05-10', status: 'pending' },
  { id: 't3', type: 'income', category: 'Donaciones', description: 'Aporte voluntario', amount: 200000, date: '2024-04-28', status: 'cleared' }
];
