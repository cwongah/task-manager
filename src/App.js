// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskCreation from './pages/TaskCreation';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { UserAuthContextProvider } from './firebase/UserAuthContext';
import { useState } from 'react';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false)

  console.log(sidebarToggle)

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800'>
      <Router>
        <UserAuthContextProvider>
          <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
          <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
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
