/* eslint-disable */

import './Layout.scss';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Form, NavDropdown } from 'react-bootstrap';
import eventBus from '../lib/eventBus';
import AmxNxConnectionLogDrawer from '../components/AmxNxConnectionLogDrawer';
import { ThemeContext } from '../context/ThemeContext';

const Layout = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [toggleConfiguration, setToggleConfiguration] = useState(
    {
      port: 1,
      channel: 1,
      switch: true,
      text: 'Dark',
      labelVisible: true,
      checked: true
    }
  )

  const [ state, dispatch ] = useContext(ThemeContext);

  const toggleRef = useRef(toggleConfiguration);
  const navigate = useNavigate();
  const location = useLocation();
  const [connectionStatusClass, setConnectionStatusClass] = useState('bg-danger');

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
    
    eventBus.on('channel.event', (data) => {
      const cb = Object.assign({}, toggleRef.current);
      if (parseInt(data.port) === parseInt(cb.port)) {
        if (parseInt(cb.channel) === parseInt(data.channel)) {
          switch (data.event) {
            case 'show': 
              if (data.state) {
                cb.hidden = false;
              } else {
                cb.hidden = true;
              }
              break;
          }
          toggleRef.current = cb;
          setToggleConfiguration(cb);
        }
      }
    })
  }, []);

  useEffect(() => {
    switch (state.connection) {
      case 'connected':
        setConnectionStatusClass('bg-success');
        break;
      case 'disconnected':
        setConnectionStatusClass('bg-danger');
        break;
      case 'error':
        setConnectionStatusClass('bg-warning');
        break;
    }
  }, [state.connection])

  const onChange = useCallback((e) => {
    dispatch({type: 'CHANGE_MODE', value: e.target.checked});
    setToggleConfiguration(prev => ({
      ...prev,
      checked: e.target.checked,
      text: e.target.checked ? 'Dark' : 'Light'
    }))
  }, []);

  return (
    <>
      <div className='w-100'>
        <header className="bd-header d-flex align-items-stretch border-bottom border-dark app-hearder">
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center fs-4 text-white mb-0">
              <img
                src={state.isDarkMode ? "/amx-logo-white.png" : "/amx-logo-blue.png"}
                height="32"
                className="me-2"
                alt="Amx Logo"
              />
            </div>
            <div className='d-flex align-items-center'>
              <Form.Check
                type={'switch'}
                label={toggleConfiguration.text}
                hidden={toggleConfiguration.hidden}
                checked={toggleConfiguration.checked}
                onChange={onChange}
              />
              <button
                type="button"
                className="btn btn-default btn-logs p-0 ms-2"
                onClick={() => setIsShowDrawer(!isShowDrawer)}
              >
                <span
                  className={`float-end p-2 border border-light rounded-circle ${connectionStatusClass}`}
                ></span>
              </button>
            </div>
          </div>
        </header>
        <main>
          <div className="app-content">
            <div className="container-fluid app-container">
              <Outlet />
            </div>
          </div>

        </main>
      </div>

      <AmxNxConnectionLogDrawer
        show={isShowDrawer}
        onHide={() => setIsShowDrawer(!isShowDrawer)}
      />
    </>
  );
};

export default Layout;
