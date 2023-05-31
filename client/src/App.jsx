import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!user ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
