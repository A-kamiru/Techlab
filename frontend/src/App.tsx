import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { SiteProvider } from '@/content/SiteContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Home from '@/pages/Home';
import DetailPage from '@/pages/DetailPage';
import Admin from '@/pages/Admin';

/** Scroll to #hash on navigation (also across pages), otherwise to the top. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="top">
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <ScrollManager />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/p/:slug" element={<DetailPage />} />
            <Route path="/services/:slug" element={<DetailPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<DetailPage />} />
          </Routes>
        </Layout>
      </SiteProvider>
    </BrowserRouter>
  );
}
