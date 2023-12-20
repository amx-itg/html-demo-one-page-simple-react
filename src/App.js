/* eslint-disable */
import './App.scss';
import { memo, useEffect, useMemo, useReducer, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import PreLoading from './components/PreLoading';
import { diffObject } from './utils/diffObject';
import { useAmxControlService } from './hooks/amxControlService';
import { ThemeContext, initialState, reducer } from './context/ThemeContext';
import eventBus from './lib/eventBus';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPreloading, setIsPreloading] = useState(true);
  const amxControlService = useAmxControlService();

  useEffect(() => {
    (async () => {
      await amxControlService.getExternalCredentials(
        '/configuration/controller.json',
        true,
      );
      setTimeout(() => {
        setIsPreloading(false);
      }, 1000);
    })();

    eventBus.on('hcontrol.connection', (data) => {
      if (data.type === 'connection') {
        dispatch({type: 'CONNECTION_CHANGE', value: data.message})
      }
    });
  }, ['']);

  return (
    <ThemeContext.Provider value={[state, dispatch]}>
      <div className={`wrapper d-flex ${state.isDarkMode ? 'dark-theme' : 'light-theme'} ${state.activeBackground}`}>
        {isPreloading ? (
          <PreLoading />
        ) : (
          <RouterProvider
            router={routes}
            fallbackElement="loading"
            future={{ v7_startTransition: true }}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

const arePropsEqual = (oldProps, newProps) => {
  const changedProps = diffObject(oldProps, newProps);
  return changedProps.length === 0;
};

export default memo(App, arePropsEqual);
