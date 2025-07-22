import { useForm } from 'react-hook-form';
import axios from '../services/Axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import {isAxiosError } from 'axios'
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await axios.post('/user/login', data);
      login(res.data.user, res.data.token);
      toast.success(t('login_success'));
      router.push('/todo');
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || t('login_failed'));
      } else {
        toast.error(t('login_failed'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">{t('login')}</h2>

        <input
          type="email"
          placeholder={t('email')}
          {...register('email', { required: t('email_required') })}
          className="input"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder={t('password')}
          {...register('password', { required: t('password_required') })}
          className="input"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? t('logging_in') : t('login')}
        </button>

        <p className="text-sm text-center">
          {t('no_account')}{' '}
          <Link href="/signup" className="text-blue-600 font-semibold">
            {t('signup')}
          </Link>
        </p>
      </form>
    </div>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
