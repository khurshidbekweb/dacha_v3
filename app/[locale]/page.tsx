import { useTranslation } from 'next-i18next';

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{t('welcome')}</h1>
    </main>
  );
}