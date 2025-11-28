import React, { createContext, useContext, useReducer } from 'react';
import { eventService } from '../services/eventService';

const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  events: [],
  loading: false,
  error: null
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const loadEvents = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await eventService.getAll();
      dispatch({ type: 'SET_EVENTS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar eventos: ' + error.message });
    }
  };

  const value = {
    ...state,
    loadEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent debe ser usado dentro de EventProvider');
  }
  return context;
};
