import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import './App.css';

import Login from './pages/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Navigate replace to='/login' />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
