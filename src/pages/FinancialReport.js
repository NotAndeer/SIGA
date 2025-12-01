import React, { useState, useEffect } from 'react';
import './FinancialReport.css';

const FinancialReport = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    balance: 0,
    pendingPayments: 0,
    membersWithDebt: 0,
    monthlyTrend: []
  });

  useEffect(() => {
    loadFinancialData();
  }, [timeRange]);

  const loadFinancialData = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Datos de ejemplo
      const data = {
        totalRevenue: 12500000,
        totalExpenses: 8750000,
        balance: 3750000,
        pendingPayments: 2850000,
        membersWithDebt: 14,
        monthlyTrend: [
          { month: 'Ene', revenue: 1200000, expenses: 850000 },
          { month: 'Feb', revenue: 1350000, expenses: 920000 },
          { month: 'Mar', revenue: 1100000, expenses: 780000 },
          { month: 'Abr', revenue: 1500000, expenses: 1050000 },
          { month: 'May', revenue: 1400000, expenses: 950000 },
          { month: 'Jun', revenue: 1600000, expenses: 1100000 }
        ]
      };
      
      setFinancialData(data);
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando reportes financieros...</p>
      </div>
    );
  }

  return (
    <div className="financial-container">
      <div className="financial-header">
        <h1>Reportes Financieros</h1>
        <div className="time-range-selector">
          <button 
            className={`time-btn ${timeRange === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeRange('monthly')}
          >
            Mensual
          </button>
          <button 
            className={`time-btn ${timeRange === 'quarterly' ? 'active' : ''}`}
            onClick={() => setTimeRange('quarterly')}
          >
            Trimestral
          </button>
          <button 
            className={`time-btn ${timeRange === 'yearly' ? 'active' : ''}`}
            onClick={() => setTimeRange('yearly')}
          >
            Anual
          </button>
        </div>
      </div>

      <div className="financial-overview">
        <div className="overview-grid">
          <div className="overview-card income">
            <h3>Ingresos Totales</h3>
            <div className="overview-value">{formatCurrency(financialData.totalRevenue)}</div>
            <div className="overview-trend positive">
              +12% vs mes anterior
            </div>
          </div>

          <div className="overview-card expenses">
            <h3>Gastos Totales</h3>
            <div className="overview-value">{formatCurrency(financialData.totalExpenses)}</div>
            <div className="overview-trend negative">
              +8% vs mes anterior
            </div>
          </div>

          <div className="overview-card balance">
            <h3>Balance Neto</h3>
            <div className="overview-value">{formatCurrency(financialData.balance)}</div>
            <div className="overview-trend positive">
              Saldo positivo
            </div>
          </div>

          <div className="overview-card pending">
            <h3>Pagos Pendientes</h3>
            <div className="overview-value">{formatCurrency(financialData.pendingPayments)}</div>
            <div className="overview-subtitle">
              {financialData.membersWithDebt} miembros con deuda
            </div>
          </div>
        </div>
      </div>

      <div className="financial-sections">
        <div className="trend-section">
          <h3>Tendencia Mensual</h3>
          <div className="trend-chart">
            {financialData.monthlyTrend.map((item, index) => (
              <div key={index} className="trend-bar">
                <div className="bar-label">{item.month}</div>
                <div className="bars-container">
                  <div 
                    className="bar revenue-bar"
                    style={{ height: `${(item.revenue / 2000000) * 100}px` }}
                    title={`Ingresos: ${formatCurrency(item.revenue)}`}
                  ></div>
                  <div 
                    className="bar expense-bar"
                    style={{ height: `${(item.expenses / 2000000) * 100}px` }}
                    title={`Gastos: ${formatCurrency(item.expenses)}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color revenue-legend"></div>
              <span>Ingresos</span>
            </div>
            <div className="legend-item">
              <div className="legend-color expense-legend"></div>
              <span>Gastos</span>
            </div>
          </div>
        </div>

        <div className="debtors-section">
          <h3>Principales Deudores</h3>
          <div className="debtors-list">
            <div className="debtor-item">
              <div className="debtor-info">
                <h4>Juan Pérez</h4>
                <span className="debtor-amount">{formatCurrency(450000)}</span>
              </div>
              <span className="debtor-status overdue">Vencido</span>
            </div>
            <div className="debtor-item">
              <div className="debtor-info">
                <h4>María García</h4>
                <span className="debtor-amount">{formatCurrency(380000)}</span>
              </div>
              <span className="debtor-status warning">Por vencer</span>
            </div>
            <div className="debtor-item">
              <div className="debtor-info">
                <h4>Carlos López</h4>
                <span className="debtor-amount">{formatCurrency(320000)}</span>
              </div>
              <span className="debtor-status overdue">Vencido</span>
            </div>
            <div className="debtor-item">
              <div className="debtor-info">
                <h4>Ana Martínez</h4>
                <span className="debtor-amount">{formatCurrency(280000)}</span>
              </div>
              <span className="debtor-status warning">Por vencer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="financial-actions">
        <button className="btn-primary">
          Generar Reporte Completo
        </button>
        <button className="btn-secondary">
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default FinancialReport;