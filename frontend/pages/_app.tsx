// pages/_app.tsx
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter(); // 🟡 Grab current locale

  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} key={locale} /> {/* ✅ Force re-render when locale changes */}
      <ToastContainer />
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
