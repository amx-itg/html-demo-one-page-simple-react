/* eslint-disable */
import React, { createContext } from 'react';

export const initialState = {
  isDarkMode: true,
  background: 'bg-dark', // set background color for the application
  activeBackground: 'bg-dark',
  connection: 'disconnected'
};
export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      if(action.value) {
        return {
          ...prevState,
          isDarkMode: action.value,
          activeBackground: prevState.background
        }
      }
      return {
        ...prevState,
        isDarkMode: action.value,
        background: prevState.activeBackground,
        activeBackground: 'bg-light'
      }
    case 'CONNECTION_CHANGE':
      return {
        ...prevState,
        connection: action.value
      }
  }
};

export const ThemeContext = createContext(initialState);