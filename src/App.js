import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubjectCreation from './components/SubjectCreation';
import SubjectView from './pages/SubjectView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { UserAuthContextProvider } from './firebase/UserAuthContext';
// import { useUserAuth } from './firebase/UserAuthContext';
import { useState } from 'react';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const [currentSubject, setCurrentSubject] = useState({})
  const [isLogin, setIsLogin] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#7AE6C5] via-indigo-600 to-purple-800'>
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
            <Route path='/dashboard' element={<Dashboard sidebarToggle={sidebarToggle} subjects={subjects} isEdit={isEdit} setIsEdit={setIsEdit} />} />
            <Route path='/subject/:id' element={<SubjectView currentSubject={currentSubject} subjects={subjects} isEdit={isEdit} setIsEdit={setIsEdit} />} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
