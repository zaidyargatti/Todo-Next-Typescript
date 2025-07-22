import { useForm } from 'react-hook-form';
import axios from '../services/Axios';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    try {
      const res = await axios.post('/user/signup', data);
      login(res.data.user, res.data.token);
      toast.success(t('signup_success'));
      router.push('/todo');
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || t('signup_failed'));
      } else {
        toast.error(t('signup_failed'));
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
        <h2 className="text-2xl font-bold text-center text-gray-800">{t('signup')}</h2>

        <input
          type="text"
          placeholder={t('name')}
          {...register('name', { required: t('name_required') })}
          className="input"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

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
          {loading ? t('signing_up') : t('signup')}
        </button>

        <p className="text-sm text-center">
          {t('have_account')}{' '}
          <Link href="/login" className="text-blue-600 font-semibold">
            {t('login')}
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
