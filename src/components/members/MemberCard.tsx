import React from 'react';
import './MemberCard.css';

const MemberCard = ({ member, onEdit, onDelete }) => {
  const joinDate = member.joinDate ? new Date(member.joinDate) : null;
  const formattedDate = joinDate && !Number.isNaN(joinDate) ? joinDate.toLocaleDateString('es-CO') : 'N/D';

  return (
    <div className="member-card">
      <div>
        <p className="member-name">{member.name}</p>
        <p className="member-email">{member.email}</p>
        <p className="member-meta">{member.profession || 'Sin profesión registrada'}</p>
        <p className="member-meta">Ingreso: {formattedDate}</p>
      </div>
      <div className="member-actions">
        <span className={`member-status ${member.status || 'active'}`}>{member.status || 'activo'}</span>
        <div className="member-action-buttons">
          <button className="btn-light" onClick={() => onEdit(member.id || member._id)}>Editar</button>
          <button className="btn-danger" onClick={() => onDelete(member.id || member._id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
