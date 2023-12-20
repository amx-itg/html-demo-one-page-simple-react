import { createBrowserRouter } from 'react-router-dom';
import NoMatch from './components/NoMatch';
import Layout from './containers/Layout';
import DashboardPage from './pages/Dashboard';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: 'dashboard',
        element: <DashboardPage />,
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
]);

export default routes;
