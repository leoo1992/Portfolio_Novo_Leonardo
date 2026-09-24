import type { Metadata } from 'next';
import { BiDashboard } from '@/components/bi-dashboard';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'BI Analytics Dashboard | Leonardo Santos Custódio',
  description:
    'Dashboard comercial interativo com KPIs, filtros, análise temporal, distribuição regional e exportação CSV.',
};

export default function BiDashboardPage() {
  return <BiDashboard />;
}
