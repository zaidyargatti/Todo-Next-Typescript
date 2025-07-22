import { useForm } from 'react-hook-form';
import axios from '../services/Axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post('/user/login', data);
      login(res.data.user, res.data.token);
      toast.success(t('login_success'));
      router.push('/todo');
    } catch (err: any) {
      toast.error(err.response?.data?.message || t('login_failed'));
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
        {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}

        <input
          type="password"
          placeholder={t('password')}
          {...register('password', { required: t('password_required') })}
          className="input"
        />
        {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? t('logging_in') : t('login')}
        </button>

        <p className="text-sm text-center">
          {t('no_account')}{' '}
          <a href="/signup" className="text-blue-600 font-semibold">{t('signup')}</a>
        </p>
      </form>
    </div>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
