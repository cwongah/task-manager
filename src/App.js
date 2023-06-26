// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskCreation from './pages/TaskCreation';
import { UserAuthContextProvider } from './firebase/UserAuthContext';

function App() {
  return (
    <div>
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/new-task' element={<TaskCreation />} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
