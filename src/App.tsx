import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import Home from './HomePage/Home';
import ProtectedRoute from './ProtectedRoutes';
import UserHome from './HomePage/UserHome';


function App() {
  return (
    <div>
            
            <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home/admin" element={<ProtectedRoute>
        <Home />
      </ProtectedRoute>} />
      <Route path="/home" element={<ProtectedRoute>
        <UserHome />
      </ProtectedRoute>} />

    </Routes>


    </div>
  
  );
}

export default App;
