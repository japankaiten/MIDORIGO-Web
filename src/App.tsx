import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Contact } from './pages/Contact';
import { DeleteAccount } from './pages/DeleteAccount';
import { EarlyAccess } from './pages/EarlyAccess';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Support } from './pages/Support';
import { Terms } from './pages/Terms';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="early-access" element={<EarlyAccess />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="contact" element={<Contact />} />
        <Route path="support" element={<Support />} />
        <Route path="delete-account" element={<DeleteAccount />} />
      </Route>
    </Routes>
  );
}
