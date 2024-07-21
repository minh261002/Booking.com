import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAppContext } from './context/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';

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

        <Route path="/search" element={<Layout >
          <Search />
        </Layout>} />

        <Route path="/detail/:id" element={
          <Layout >
            <Detail />
          </Layout>
        } />

        {isLoggedIn && (
          <>
            <Route path="/add-hotel" element={<Layout >
              <AddHotel />
            </Layout>} />

            <Route path="/edit-hotel/:hotelId" element={<Layout >
              <EditHotel />
            </Layout>} />

            <Route path="/hotel/:hotelId/booking" element={<Layout >
              <Booking />
            </Layout>} />

            <Route path="/my-hotels" element={<Layout >
              <MyHotels />
            </Layout>} />
          </>
        )}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  )
}

export default App