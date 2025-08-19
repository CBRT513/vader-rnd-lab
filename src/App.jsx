import Layout from '@/components/Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home.jsx';
import Lab from '@/pages/Lab.jsx';
import Releases from '@/pages/Releases.jsx';
import Settings from '@/pages/Settings.jsx';
import NotFound from '@/pages/NotFound.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
