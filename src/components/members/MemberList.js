import React from 'react';
import MemberCard from './MemberCard';
import './MemberList.css';

const MemberList = ({ members, onEdit, onDelete }) => {
  if (!members.length) {
    return <div className="member-empty">No hay miembros registrados aún.</div>;
  }

  return (
    <div className="member-list">
      <div className="member-table-wrapper">
        <table className="member-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Ingreso</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              const joinDate = member.joinDate ? new Date(member.joinDate) : null;
              const formattedJoin = joinDate && !Number.isNaN(joinDate) ? joinDate.toLocaleDateString('es-CO') : 'N/D';
              return (
                <tr key={member.id || member._id}>
                  <td>
                    <div className="member-name-cell">{member.name}</div>
                    <div className="member-meta-text">{member.profession || 'Sin profesión'}</div>
                  </td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>
                    <span className={`badge ${member.status || 'active'}`}>
                      {member.status || 'activo'}
                    </span>
                  </td>
                  <td>{formattedJoin}</td>
                  <td className="actions">
                    <button className="table-btn" onClick={() => onEdit(member.id || member._id)}>
                      Editar
                    </button>
                    <button className="table-btn danger" onClick={() => onDelete(member.id || member._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="member-cards">
        {members.map((member) => (
          <MemberCard key={member.id || member._id} member={member} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default MemberList;
