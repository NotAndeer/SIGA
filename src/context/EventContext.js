import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { eventService } from '../services/eventService';

const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload, loading: false, error: null };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT': {
      const payloadId = action.payload.id || action.payload._id;
      return {
        ...state,
        events: state.events.map((evt) => ((evt.id || evt._id) === payloadId ? action.payload : evt)),
      };
    }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((evt) => (evt.id || evt._id) !== action.payload),
      };
    case 'SET_CURRENT_EVENT':
      return { ...state, currentEvent: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  events: [],
  loading: false,
  error: null,
  currentEvent: null,
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const loadEvents = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await eventService.getAll();
      dispatch({ type: 'SET_EVENTS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar eventos: ' + error.message });
    }
  }, []);

  const getEventById = useCallback(async (id) => {
    try {
      const response = await eventService.getById(id);
      dispatch({ type: 'SET_CURRENT_EVENT', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar evento: ' + error.message });
      throw error;
    }
  }, []);

  const createEvent = useCallback(async (data) => {
    try {
      const response = await eventService.create(data);
      dispatch({ type: 'ADD_EVENT', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al crear evento: ' + error.message });
      throw error;
    }
  }, []);

  const updateEvent = useCallback(async (id, data) => {
    try {
      const response = await eventService.update(id, data);
      dispatch({ type: 'UPDATE_EVENT', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al actualizar evento: ' + error.message });
      throw error;
    }
  }, []);

  const deleteEvent = useCallback(async (id) => {
    try {
      await eventService.delete(id);
      dispatch({ type: 'DELETE_EVENT', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al eliminar evento: ' + error.message });
      throw error;
    }
  }, []);

  const value = {
    ...state,
    loadEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent debe ser usado dentro de EventProvider');
  }
  return context;
};
