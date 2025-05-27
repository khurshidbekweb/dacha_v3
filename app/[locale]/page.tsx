'use client';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    router.push(`/${lng}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">{t('welcome')}</h1>
        
        <div className="flex gap-4">
          <Button onClick={() => changeLanguage('uz')}>O'zbek</Button>
          <Button onClick={() => changeLanguage('ru')}>Русский</Button>
          <Button onClick={() => changeLanguage('en')}>English</Button>
        </div>
      </div>
    </main>
  );
}