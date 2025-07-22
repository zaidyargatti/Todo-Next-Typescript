import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();
  const changeLang = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className="space-x-2 text-sm">
      <button onClick={() => changeLang('en')}>EN</button>
      <button onClick={() => changeLang('hi')}>हिं</button>
    </div>
  );
}
