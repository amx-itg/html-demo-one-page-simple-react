import Spinner from 'react-bootstrap/Spinner';

import './index.scss';

const PreLoading = () => (
  <div className="w-100">
    <div className="app-preloading__container">
      <img src="/amx-logo-white.png" alt="Amx Logo" />
      <h2>Loading...</h2>
      <Spinner animation="border" variant="secondary" />
    </div>
  </div>
);

export default PreLoading;
