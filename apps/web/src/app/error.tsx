'use client';

import { useExperience } from '@/components/experience-provider';

export default function ErrorPage({ reset }: { reset: () => void }) {
  const { t } = useExperience();

  return (
    <main className="shell error-state">
      <p className="eyebrow">{t('errorEyebrow')}</p>
      <h1>{t('errorTitle')}</h1>
      <p>{t('errorCopy')}</p>
      <button className="button button-primary" type="button" onClick={reset}>
        {t('retry')}
      </button>
    </main>
  );
}
