import React, { useMemo, useState } from 'react';
import './FinancialReport.css';

const seedTransactions = [
  { id: 't1', type: 'income', category: 'Cuotas', description: 'Pago mensual', amount: 150000, date: '2024-05-02', status: 'cleared' },
  { id: 't2', type: 'expense', category: 'Logística', description: 'Alquiler de salón', amount: 80000, date: '2024-05-10', status: 'pending' },
  { id: 't3', type: 'income', category: 'Donaciones', description: 'Aporte voluntario', amount: 200000, date: '2024-04-28', status: 'cleared' },
];

const FinancialReport = () => {
  const [transactions, setTransactions] = useState(seedTransactions);
  const [filters, setFilters] = useState({ type: 'all', status: 'all', month: 'all' });
  const [formData, setFormData] = useState({ type: 'income', category: '', amount: '', date: '', description: '' });
  const [errors, setErrors] = useState({});

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = filters.type === 'all' || tx.type === filters.type;
      const matchesStatus = filters.status === 'all' || tx.status === filters.status;
      const matchesMonth = filters.month === 'all' || (tx.date && tx.date.startsWith(filters.month));
      return matchesType && matchesStatus && matchesMonth;
    });
  }, [transactions, filters]);

  const totals = useMemo(() => {
    const income = filteredTransactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + Number(t.amount || 0), 0);
    const expenses = filteredTransactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount || 0), 0);
    return { income, expenses, balance: income - expenses };
  }, [filteredTransactions]);

  const validate = () => {
    const newErrors = {};
    if (!formData.category.trim()) newErrors.category = 'Categoría requerida';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Monto inválido';
    if (!formData.date) newErrors.date = 'Fecha requerida';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    const newTx = {
      ...formData,
      id: crypto.randomUUID(),
      amount: Number(formData.amount),
      status: 'pending'
    };
    setTransactions((prev) => [newTx, ...prev]);
    setFormData({ type: 'income', category: '', amount: '', date: '', description: '' });
    setErrors({});
  };

  const toggleStatus = (id) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, status: tx.status === 'cleared' ? 'pending' : 'cleared' } : tx)));
  };

  const deleteTx = (id) => {
    const confirmed = window.confirm('¿Eliminar este movimiento?');
    if (!confirmed) return;
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Finanzas</h1>
          <p>Control de ingresos, egresos y balance general</p>
        </div>
      </div>

      <div className="finance-grid">
        <div className="summary-card positive">
          <p className="summary-label">Ingresos</p>
          <p className="summary-value">${totals.income.toLocaleString()}</p>
        </div>
        <div className="summary-card negative">
          <p className="summary-label">Egresos</p>
          <p className="summary-value">${totals.expenses.toLocaleString()}</p>
        </div>
        <div className={`summary-card ${totals.balance >= 0 ? 'positive' : 'negative'}`}>
          <p className="summary-label">Balance</p>
          <p className="summary-value">${totals.balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="finance-panels">
        <div className="panel">
          <div className="panel-header">
            <h3>Registrar movimiento</h3>
          </div>
          <form className="finance-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Tipo</label>
                <select id="type" name="type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  <option value="income">Ingreso</option>
                  <option value="expense">Egreso</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoría *</label>
                <input id="category" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="amount">Monto *</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0"
                />
                {errors.amount && <span className="error-message">{errors.amount}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="date">Fecha *</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Agregar movimiento</button>
            </div>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Movimientos</h3>
            <div className="filters">
              <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="all">Todos</option>
                <option value="income">Ingresos</option>
                <option value="expense">Egresos</option>
              </select>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="all">Estado</option>
                <option value="cleared">Conciliados</option>
                <option value="pending">Pendientes</option>
              </select>
              <select value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })}>
                <option value="all">Todos los meses</option>
                <option value="2024-05">Mayo 2024</option>
                <option value="2024-04">Abril 2024</option>
              </select>
            </div>
          </div>

          <div className="transaction-list">
            {filteredTransactions.length === 0 && <div className="empty">No hay movimientos con los filtros seleccionados.</div>}
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <div>
                  <p className="tx-title">{tx.category}</p>
                  <p className="tx-description">{tx.description}</p>
                  <p className="tx-date">{tx.date}</p>
                </div>
                <div className="tx-actions">
                  <span className={`badge ${tx.type}`}>{tx.type === 'income' ? 'Ingreso' : 'Egreso'}</span>
                  <span className={`badge ${tx.status}`}>{tx.status === 'cleared' ? 'Conciliado' : 'Pendiente'}</span>
                  <p className={`tx-amount ${tx.type}`}>${Number(tx.amount).toLocaleString()}</p>
                  <div className="action-buttons">
                    <button className="btn-light" onClick={() => toggleStatus(tx.id)}>
                      {tx.status === 'cleared' ? 'Marcar pendiente' : 'Conciliar'}
                    </button>
                    <button className="btn-danger" onClick={() => deleteTx(tx.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;
