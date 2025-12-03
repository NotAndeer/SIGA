import React from 'react';
import { Member } from '../../types/models';
import MemberCard from './MemberCard';
import './MemberList.css';

type MemberListProps = {
  members: Member[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const MemberList: React.FC<MemberListProps> = ({ members, onEdit, onDelete }) => {
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
              const memberId = member.id || member._id;
              return (
                <tr key={memberId}>
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
                    <button className="table-btn" onClick={() => memberId && onEdit(memberId)}>
                      Editar
                    </button>
                    <button className="table-btn danger" onClick={() => memberId && onDelete(memberId)}>
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
