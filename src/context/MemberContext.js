import React, { createContext, useContext, useReducer } from 'react';
import { memberService } from '../services/memberService';

const MemberContext = createContext();

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_MEMBERS':
      return { 
        ...state, 
        members: action.payload, 
        loading: false,
        error: null 
      };

    case 'ADD_MEMBER':
      return {
        ...state,
        members: [...state.members, action.payload]
      };

    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id ? action.payload : member
        )
      };

    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter(member => member.id !== action.payload)
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'SET_CURRENT_MEMBER':
      return {
        ...state,
        currentMember: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  members: [],
  loading: false,
  error: null,
  currentMember: null
};

export const MemberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  const loadMembers = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await memberService.getAll();
      dispatch({ type: 'SET_MEMBERS', payload: response.data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Error al cargar miembros: ' + error.message 
      });
    }
  };

  const addMember = async (memberData) => {
    try {
      const response = await memberService.create(memberData);
      dispatch({ type: 'ADD_MEMBER', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Error al crear miembro: ' + error.message 
      });
      throw error;
    }
  };

  const updateMember = async (id, memberData) => {
    try {
      const response = await memberService.update(id, memberData);
      dispatch({ type: 'UPDATE_MEMBER', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Error al actualizar miembro: ' + error.message 
      });
      throw error;
    }
  };

  const deleteMember = async (id) => {
    try {
      await memberService.delete(id);
      dispatch({ type: 'DELETE_MEMBER', payload: id });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Error al eliminar miembro: ' + error.message 
      });
      throw error;
    }
  };

  const getMemberById = async (id) => {
    try {
      const response = await memberService.getById(id);
      dispatch({ type: 'SET_CURRENT_MEMBER', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Error al cargar miembro: ' + error.message 
      });
      throw error;
    }
  };

  const value = {
    ...state,
    loadMembers,
    addMember,
    updateMember,
    deleteMember,
    getMemberById
  };

  return (
    <MemberContext.Provider value={value}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember debe ser usado dentro de MemberProvider');
  }
  return context;
};
