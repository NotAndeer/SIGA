import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberList from '../components/members/MemberList';
import MemberStats from '../components/members/MemberStats';
import LoadingScreen from '../components/common/LoadingScreen';
import { useMember } from '../context/MemberContext';
import './MemberList.css';

const MemberListPage = () => {
  const navigate = useNavigate();
  const { members, loadMembers, deleteMember, loading, error } = useMember();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = member.name?.toLowerCase().includes(search.toLowerCase()) ||
        member.email?.toLowerCase().includes(search.toLowerCase()) ||
        member.profession?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || (member.status || 'active') === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  const stats = useMemo(() => ({
    totalMembers: members.length,
    activeMembers: members.filter((m) => (m.status || 'active') === 'active').length,
    pendingPayments: members.filter((m) => (m.paymentStatus || '').toLowerCase() === 'pending').length,
    upcomingEvents: 0
  }), [members]);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('¿Deseas eliminar este miembro?');
    if (!shouldDelete) return;
    await deleteMember(id);
  };

  if (loading) {
    return <LoadingScreen message="Cargando miembros..." />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Miembros</h1>
          <p>Administra la base de miembros y sus datos de contacto</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => loadMembers()}>Actualizar</button>
          <button className="btn-primary" onClick={() => navigate('/members/new')}>Nuevo miembro</button>
        </div>
      </div>

      <MemberStats stats={stats} />

      <div className="filters">
        <input
          type="search"
          placeholder="Buscar por nombre, email o profesión"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
          <option value="suspended">Suspendidos</option>
        </select>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <MemberList
        members={filteredMembers}
        onEdit={(id) => navigate(`/members/edit/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MemberListPage;
