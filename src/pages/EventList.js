import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const EventList = () => {
  return (
    <Layout>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Eventos</h1>
            <p>Gestión de eventos y actividades</p>
          </div>
          <Link 
            to="/events/new" 
            style={{
              background: '#667eea',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            + Nuevo Evento
          </Link>
        </div>
      </div>
      
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '25px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <p>Lista de eventos aparecerá aquí...</p>
      </div>
    </Layout>
  );
};

export default EventList;