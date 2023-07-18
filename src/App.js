// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskCreation from './pages/TaskCreation';
import SubjectCreation from './pages/SubjectCreation';
import SubjectView from './pages/SubjectView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { UserAuthContextProvider } from './firebase/UserAuthContext';
import { useUserAuth } from './firebase/UserAuthContext';
import { useState } from 'react';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const [currentSubject, setCurrentSubject] = useState({})
  const [isLogin, setIsLogin] = useState(false)
  const [subjects, setSubjects] = useState([])

  // console.log(currentSubject)

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#7AE6C5] via-indigo-600 to-purple-800'>
      {/* bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 */}
      <Router>
        <UserAuthContextProvider>
          {isLogin ? 
            <Sidebar 
              sidebarToggle={sidebarToggle} 
              setSidebarToggle={setSidebarToggle} 
              setCurrentSubject={setCurrentSubject}
              currentSubject={currentSubject}
              subjects={subjects} 
              setSubjects={setSubjects}
            />
            :
            null
          }
            <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} setIsLogin={setIsLogin} />
          <Routes>
            <Route path='/' element={<Login setIsLogin={setIsLogin} />} />
            {/* <Route path='/signup' element={<Signup />} /> */}
            <Route path='/dashboard' element={<Dashboard subjects={subjects} />} />
            {/* <Route path='/new-task' element={<TaskCreation subjects={subjects} setSubjects={setSubjects} />} /> */}
            <Route path='/new-subject' element={<SubjectCreation />} />
            <Route path='/subject/:id' element={<SubjectView currentSubject={currentSubject} />} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
