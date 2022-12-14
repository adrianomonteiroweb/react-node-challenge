import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Navigate replace to='/login' />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
