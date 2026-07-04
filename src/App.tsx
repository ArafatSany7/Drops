import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FindBlood from './pages/FindBlood'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Impact from './pages/Impact'
import About from './pages/About'

import Profile from './pages/Profile'
import Onboarding from './pages/Onboarding'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="find-blood" element={<FindBlood />} />
        <Route path="impact" element={<Impact />} />
        <Route path="about" element={<About />} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="onboarding" element={<Onboarding />} />
      </Route>
    </Routes>
  )
}

export default App
