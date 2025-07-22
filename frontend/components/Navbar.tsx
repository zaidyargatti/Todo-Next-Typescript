import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '../services/Axios';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'next-i18next';

interface MenuItem {
  label: string;
  path: string;
}

export default function Navbar() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const { user, logout } = useAuth();
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get('/menu');
      setMenu(res.data);
    };
    fetchMenu();
  }, []);

  return (
    <nav className="bg-white px-4 py-2 shadow flex justify-between items-center">
      <div className="flex space-x-4">
        {menu.map((item) =>
          item.path === '/login' && user ? null :
          item.path === '/signup' && user ? null : (
            <Link key={item.path} href={item.path} className="text-gray-700 hover:text-blue-600">
              {t(item.label.toLowerCase())}
            </Link>
          )
        )}
      </div>
      <div className="flex space-x-4 items-center">
        <LanguageSwitcher />
        {user && (
          <button onClick={logout} className="text-red-500 text-sm hover:underline">
            {t('logout')}
          </button>
        )}
      </div>
    </nav>
  );
}
