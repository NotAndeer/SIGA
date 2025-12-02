import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { memberService } from '../services/memberService';
import { Member } from '../types/models';

type MemberState = {
  members: Member[];
  loading: boolean;
  error: string | null;
  currentMember: Member | null;
};

type MemberAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_MEMBERS'; payload: Member[] }
  | { type: 'ADD_MEMBER'; payload: Member }
  | { type: 'UPDATE_MEMBER'; payload: Member }
  | { type: 'DELETE_MEMBER'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_CURRENT_MEMBER'; payload: Member | null };

type MemberContextValue = MemberState & {
  loadMembers: () => Promise<void>;
  addMember: (member: Partial<Member>) => Promise<Member>;
  updateMember: (id: string, member: Partial<Member>) => Promise<Member | undefined>;
  deleteMember: (id: string) => Promise<void>;
  getMemberById: (id: string) => Promise<Member | undefined>;
};

const MemberContext = createContext<MemberContextValue | undefined>(undefined);

const memberReducer = (state: MemberState, action: MemberAction): MemberState => {
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

const initialState: MemberState = {
  members: [],
  loading: false,
  error: null,
  currentMember: null
};

type Props = { children: React.ReactNode };

export const MemberProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  const loadMembers = useCallback(async (): Promise<void> => {
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
  }, []);

  const addMember = async (memberData: Partial<Member>) => {
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

  const updateMember = async (id: string, memberData: Partial<Member>) => {
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

  const deleteMember = async (id: string) => {
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

  const getMemberById = async (id: string) => {
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

export const useMember = (): MemberContextValue => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember debe ser usado dentro de MemberProvider');
  }
  return context;
};
