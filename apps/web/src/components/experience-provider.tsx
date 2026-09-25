'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

export type Locale = 'pt' | 'en' | 'es';
export type ThemePreference = 'light' | 'dark';

const localeTags: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

const dictionary = {
  pt: {
    skipContent: 'Pular para o conteúdo',
    navLabel: 'Navegação principal',
    navProjects: 'Projetos',
    navGithub: 'Abrir GitHub de Leonardo em uma nova aba',
    navLinkedin: 'Abrir LinkedIn de Leonardo em uma nova aba',
    languageLabel: 'Idioma',
    themeLabel: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    heroEyebrow: 'Desenvolvedor de software',
    heroTitle: 'Engenharia de software com estética, precisão e experiência.',
    heroCopy: 'Desenvolvimento full-stack com foco em interfaces robustas, APIs bem estruturadas, performance, acessibilidade e produtos digitais que parecem tão bons quanto funcionam.',
    projectsCta: 'Explorar projetos',
    repositories: 'Repositórios',
    publicRepositories: 'Públicos',
    privateRepositories: 'Privados',
    followers: 'Seguidores',
    technologies: 'Tecnologias',
    stars: 'Estrelas',
    githubProfile: 'Perfil do GitHub',
    profileLocation: 'Localização',
    projectsEyebrow: 'GitHub / laboratório',
    projectsTitle: 'Projetos selecionados',
    results: 'projetos',
    filtersLabel: 'Filtrar projetos',
    searchLabel: 'Buscar projeto',
    searchPlaceholder: 'Buscar',
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
    privateProject: 'Projeto privado',
    completedWork: 'Trabalho concluído',
    commercialDelivery: 'Entrega comercial',
    forks: 'forks',
    footerRole: 'Software Developer · Full-stack',
    footerBuilt: 'Next.js · NestJS · Redux · Tailwind CSS',
    footerSocial: 'Perfis profissionais',
    errorEyebrow: 'Falha temporária',
    errorTitle: 'Não foi possível carregar os projetos.',
    errorCopy: 'Tente novamente. Se o problema persistir, a API pode estar temporariamente indisponível.',
    retry: 'Tentar novamente',
  },
  en: {
    skipContent: 'Skip to content',
    navLabel: 'Primary navigation',
    navProjects: 'Projects',
    navGithub: "Open Leonardo's GitHub in a new tab",
    navLinkedin: "Open Leonardo's LinkedIn in a new tab",
    languageLabel: 'Language',
    themeLabel: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    heroEyebrow: 'Software developer',
    heroTitle: 'Software engineering with aesthetics, precision and experience.',
    heroCopy: 'Full-stack development focused on robust interfaces, well-structured APIs, performance, accessibility and digital products that look as good as they work.',
    projectsCta: 'Explore projects',
    repositories: 'Repositories',
    publicRepositories: 'Public',
    privateRepositories: 'Private',
    followers: 'Followers',
    technologies: 'Technologies',
    stars: 'Stars',
    githubProfile: 'GitHub profile',
    profileLocation: 'Location',
    projectsEyebrow: 'GitHub / lab',
    projectsTitle: 'Selected projects',
    results: 'projects',
    filtersLabel: 'Filter projects',
    searchLabel: 'Search projects',
    searchPlaceholder: 'Search',
    languageFilter: 'Filter by language',
    allLanguages: 'All languages',
    sortLabel: 'Sort projects',
    sortUpdated: 'Recently updated',
    sortStars: 'Most stars',
    sortForks: 'Most forks',
    sortName: 'Name A–Z',
    includeArchived: 'Include archived',
    onlyDemo: 'Only with demo',
    emptyTitle: 'No projects match the current filters.',
    clearFilters: 'Clear filters',
    projectFallback: 'Project available for review on GitHub.',
    projectGeneric: 'Project',
    archived: 'Archived',
    topicsLabel: 'Technologies and topics',
    demo: 'Demo',
    code: 'Code',
    privateProject: 'Private project',
    completedWork: 'Completed work',
    commercialDelivery: 'Commercial delivery',
    forks: 'forks',
    footerRole: 'Software Developer · Full-stack',
    footerBuilt: 'Next.js · NestJS · Redux · Tailwind CSS',
    footerSocial: 'Professional profiles',
    errorEyebrow: 'Temporary issue',
    errorTitle: 'Projects could not be loaded.',
    errorCopy: 'Try again. If the issue persists, the API may be temporarily unavailable.',
    retry: 'Try again',
  },
  es: {
    skipContent: 'Saltar al contenido',
    navLabel: 'Navegación principal',
    navProjects: 'Proyectos',
    navGithub: 'Abrir GitHub de Leonardo en una nueva pestaña',
    navLinkedin: 'Abrir LinkedIn de Leonardo en una nueva pestaña',
    languageLabel: 'Idioma',
    themeLabel: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    heroEyebrow: 'Desarrollador de software',
    heroTitle: 'Ingeniería de software con estética, precisión y experiencia.',
    heroCopy: 'Desarrollo full-stack enfocado en interfaces robustas, APIs bien estructuradas, rendimiento, accesibilidad y productos digitales que se ven tan bien como funcionan.',
    projectsCta: 'Explorar proyectos',
    repositories: 'Repositorios',
    publicRepositories: 'Públicos',
    privateRepositories: 'Privados',
    followers: 'Seguidores',
    technologies: 'Tecnologías',
    stars: 'Estrellas',
    githubProfile: 'Perfil de GitHub',
    profileLocation: 'Ubicación',
    projectsEyebrow: 'GitHub / laboratorio',
    projectsTitle: 'Proyectos seleccionados',
    results: 'proyectos',
    filtersLabel: 'Filtrar proyectos',
    searchLabel: 'Buscar proyectos',
    searchPlaceholder: 'Buscar',
    languageFilter: 'Filtrar por lenguaje',
    allLanguages: 'Todos los lenguajes',
    sortLabel: 'Ordenar proyectos',
    sortUpdated: 'Actualizados recientemente',
    sortStars: 'Más estrellas',
    sortForks: 'Más forks',
    sortName: 'Nombre A–Z',
    includeArchived: 'Incluir archivados',
    onlyDemo: 'Solo con demo',
    emptyTitle: 'Ningún proyecto coincide con los filtros actuales.',
    clearFilters: 'Limpiar filtros',
    projectFallback: 'Proyecto disponible para consultar en GitHub.',
    projectGeneric: 'Proyecto',
    archived: 'Archivado',
    topicsLabel: 'Tecnologías y temas',
    demo: 'Demo',
    code: 'Código',
    privateProject: 'Proyecto privado',
    completedWork: 'Trabajo concluido',
    commercialDelivery: 'Entrega comercial',
    forks: 'forks',
    footerRole: 'Software Developer · Full-stack',
    footerBuilt: 'Next.js · NestJS · Redux · Tailwind CSS',
    footerSocial: 'Perfiles profesionales',
    errorEyebrow: 'Fallo temporal',
    errorTitle: 'No fue posible cargar los proyectos.',
    errorCopy: 'Inténtalo de nuevo. Si el problema persiste, la API puede no estar disponible temporalmente.',
    retry: 'Intentar de nuevo',
  },
} as const;

export type TranslationKey = keyof typeof dictionary.pt;

interface ExperienceValue {
  locale: Locale;
  localeTag: string;
  setLocale: (locale: Locale) => void;
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

  const locale = useSyncExternalStore(
    subscribe,
    () => {
      const saved = window.localStorage.getItem('portfolio-locale');
      return saved === 'pt' || saved === 'en' || saved === 'es' ? saved : 'pt';
    },
    () => 'pt' as Locale,
  );

  const theme = useSyncExternalStore(
    subscribe,
    () => {
      const saved = window.localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },
    () => 'light' as ThemePreference,
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem('portfolio-locale', nextLocale);
    window.dispatchEvent(new Event('portfolio-preference-change'));
  }, []);

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    window.localStorage.setItem('portfolio-theme', nextTheme);
    window.dispatchEvent(new Event('portfolio-preference-change'));
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeTags[locale];
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const t = useCallback((key: TranslationKey) => dictionary[locale][key], [locale]);

  const value = useMemo(
    () => ({ locale, localeTag: localeTags[locale], setLocale, theme, setTheme, t }),
    [locale, setLocale, setTheme, theme, t],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error('useExperience must be used inside ExperienceProvider');
  return context;
}
