'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

export type ThemePreference = 'light' | 'dark';

const dictionary = {
  skipContent: 'Pular para o conteúdo',
  navLabel: 'Navegação principal',
  navProjects: 'Projetos',
  navGithub: 'Abrir GitHub de Leonardo em uma nova aba',
  navLinkedin: 'Abrir LinkedIn de Leonardo em uma nova aba',
  themeLabel: 'Tema',
  themeLight: 'Claro',
  themeDark: 'Escuro',
  heroEyebrow: 'Desenvolvedor de software',
  heroTitle: 'Engenharia de software com estética, precisão e experiência.',
  heroCopy:
    'Desenvolvimento full-stack com foco em interfaces robustas, APIs bem estruturadas, performance, acessibilidade e produtos digitais que parecem tão bons quanto funcionam.',
  projectsCta: 'Explorar projetos',
  repositories: 'Repositórios',
  followers: 'Seguidores',
  technologies: 'Tecnologias',
  stars: 'Estrelas',
  githubProfile: 'Perfil do GitHub',
  profileLocation: 'Localização',
  projectsEyebrow: 'GitHub / laboratório',
  projectsTitle: 'Projetos públicos',
  results: 'projetos',
  filtersLabel: 'Filtrar projetos',
  searchLabel: 'Buscar projeto',
  searchPlaceholder: 'Buscar por nome, tecnologia ou tema',
  languageFilter: 'Filtrar por linguagem',
  allLanguages: 'Todas as linguagens',
  sortLabel: 'Ordenar projetos',
  sortUpdated: 'Atualizados recentemente',
  sortStars: 'Mais estrelas',
  sortForks: 'Mais forks',
  sortName: 'Nome A–Z',
  includeArchived: 'Incluir arquivados',
  onlyDemo: 'Somente com demo',
  emptyTitle: 'Nenhum projeto corresponde aos filtros atuais.',
  clearFilters: 'Limpar filtros',
  projectFallback: 'Projeto disponível para consulta no GitHub.',
  projectGeneric: 'Projeto',
  archived: 'Arquivado',
  topicsLabel: 'Tecnologias e tópicos',
  demo: 'Demo',
  code: 'Código',
  forks: 'forks',
  footerRole: 'Software Developer · Full-stack',
  footerBuilt: 'Next.js · NestJS · Redux · Tailwind CSS',
  footerSocial: 'Perfis profissionais',
  errorEyebrow: 'Falha temporária',
  errorTitle: 'Não foi possível carregar os projetos.',
  errorCopy:
    'Tente novamente. Se o problema persistir, a API pode estar temporariamente indisponível.',
  retry: 'Tentar novamente',
} as const;

export type TranslationKey = keyof typeof dictionary;

interface ExperienceValue {
  localeTag: 'pt-BR';
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  t: (key: TranslationKey) => string;
}

const ExperienceContext = createContext<ExperienceValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const subscribe = useCallback((callback: () => void) => {
    const handleStorage = () => callback();
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    window.addEventListener('storage', handleStorage);
    window.addEventListener('portfolio-preference-change', handleStorage);
    media.addEventListener('change', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('portfolio-preference-change', handleStorage);
      media.removeEventListener('change', handleStorage);
    };
  }, []);

  const theme = useSyncExternalStore(
    subscribe,
    () => {
      const saved = window.localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },
    () => 'light' as ThemePreference,
  );

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    window.localStorage.setItem('portfolio-theme', nextTheme);
    window.dispatchEvent(new Event('portfolio-preference-change'));
  }, []);

  const t = useCallback((key: TranslationKey) => dictionary[key], []);

  const value = useMemo(
    () => ({ localeTag: 'pt-BR' as const, theme, setTheme, t }),
    [setTheme, theme, t],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error('useExperience must be used inside ExperienceProvider');
  return context;
}
