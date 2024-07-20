import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAppContext } from './context/AppContext';
import AddHotel from './pages/AddHotel';

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout ><h1>Home</h1></Layout>} />
        <Route path="/register" element={<Layout >
          <Register />
        </Layout>} />

        <Route path="/login" element={<Layout >
          <Login />
        </Layout>} />

        {isLoggedIn && (
          <Route path="/add-hotel" element={<Layout >
            <AddHotel />
          </Layout>} />
        )}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  )
}

export default App