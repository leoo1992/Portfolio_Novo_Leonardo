'use client';

import { useExperience } from './experience-provider';

export function SkipLink() {
  const { t } = useExperience();
  return (
    <a className="skip-link" href="#conteudo">
      {t('skipContent')}
    </a>
  );
}
