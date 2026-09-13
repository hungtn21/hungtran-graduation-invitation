import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import InvitePage from './pages/InvitePage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/thiep-moi/:slug" element={<InvitePage />} />
      <Route path="/quan-ly" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
