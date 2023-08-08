import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { isTokenExpired, getRefreshedtoken } from './services/authentication';
import { setLogout } from './store/userReducer';

import './styles/App.scss';
import './styles/global.scss';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Stakeholders from './pages/Stakeholders/Stakeholders';
import StakeholderProfile from './pages/StakeholderProfile/StakeholderProfile';
import Deliverys from './pages/Deliverys/Deliverys';
import DeliveryRoute from './pages/DeliveryRoute/DeliveryRoute';
import ProjectTable from './components/Table/ProjectTable/ProjectTable';
import Projects from './pages/Projects/Projects';
import Records from './pages/Records/Records';

function App() {

  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokenExpired()) {
      dispatch(setLogout());
      getRefreshedtoken();
    }
  }, [isTokenExpired()]);

  if (!isLoggedIn) return <Login />
  
  return (
    <div className="app-container">
      <Sidebar />
      <ProjectTable />
      <div className='routes'>
        <Routes >
          <Route path="/" element={<Dashboard />} />
          <Route path="/stakeholders" element={<Stakeholders />} />
          <Route path="/stakeholders/:name" element={<StakeholderProfile />} />
          <Route path="/deliverys" element={<Deliverys />} />
          <Route path="/deliverys/:route" element={<DeliveryRoute /> } />
          <Route path="/records" element={ <Records />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
