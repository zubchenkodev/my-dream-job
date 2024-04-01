import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddJob, AllJobs, EditProfile, Profile, RootLayout, Stats } from './pages/root';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './pages/auth/Registration';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/" element={<ProtectedRoute><RootLayout /></ProtectedRoute>}>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
          <Route path='edit-profile' element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;