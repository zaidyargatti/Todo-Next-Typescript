import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
       <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
