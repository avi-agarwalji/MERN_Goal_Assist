import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import EditGoal from './pages/EditGoal';

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
        <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route
          path="/goal/:id"
          element={user ? <EditGoal /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
