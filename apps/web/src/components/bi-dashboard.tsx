'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './bi-dashboard.module.css';

type Region = 'Sul' | 'Sudeste' | 'Nordeste' | 'Centro-Oeste';
type Channel = 'E-commerce' | 'Loja' | 'Parceiros';
type Category = 'Software' | 'Serviços' | 'Suporte' | 'Treinamento';
type Period = '3m' | '6m' | '12m';

interface SaleRecord {
  monthIndex: number;
  month: string;
  region: Region;
  channel: Channel;
  category: Category;
  revenue: number;
  cost: number;
  orders: number;
  customers: number;
}

const REGIONS: Region[] = ['Sul', 'Sudeste', 'Nordeste', 'Centro-Oeste'];
const CHANNELS: Channel[] = ['E-commerce', 'Loja', 'Parceiros'];
const CATEGORIES: Category[] = ['Software', 'Serviços', 'Suporte', 'Treinamento'];

const MONTHS = Array.from({ length: 24 }, (_, index) => {
  const date = new Date(Date.UTC(2024, 9 + index, 1));
  return {
    index,
    key: date.toISOString().slice(0, 7),
    label: new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      year: '2-digit',
      timeZone: 'UTC',
    })
      .format(date)
      .replace('.', ''),
  };
});

const REGION_FACTOR: Record<Region, number> = {
  Sul: 1.08,
  Sudeste: 1.34,
  Nordeste: 0.84,
  'Centro-Oeste': 0.72,
};

const CHANNEL_FACTOR: Record<Channel, number> = {
  'E-commerce': 1.18,
  Loja: 0.92,
  Parceiros: 0.78,
};

const SALES: SaleRecord[] = MONTHS.flatMap((month) =>
  REGIONS.flatMap((region, regionIndex) =>
    CHANNELS.map((channel, channelIndex) => {
      const category = CATEGORIES[(month.index + regionIndex * 2 + channelIndex) % CATEGORIES.length]!;
      const seasonal = 1 + Math.sin((month.index / 12) * Math.PI * 2) * 0.11;
      const trend = 1 + month.index * 0.018;
      const base = 76000 + ((month.index * 7919 + regionIndex * 3797 + channelIndex * 1901) % 24000);
      const revenue = Math.round(base * REGION_FACTOR[region] * CHANNEL_FACTOR[channel] * seasonal * trend);
      const marginRate = 0.34 + ((month.index + regionIndex + channelIndex) % 8) * 0.012;
      const cost = Math.round(revenue * (1 - marginRate));
      const orders = Math.max(16, Math.round(revenue / (1950 + ((month.index + channelIndex) % 5) * 140)));
      const customers = Math.max(12, Math.round(orders * (0.72 + regionIndex * 0.025)));

      return {
        monthIndex: month.index,
        month: month.key,
        region,
        channel,
        category,
        revenue,
        cost,
        orders,
        customers,
      };
    }),
  ),
);

const PERIOD_LENGTH: Record<Period, number> = {
  '3m': 3,
  '6m': 6,
  '12m': 12,
};

function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

function compactCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function integer(value: number) {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(value);
}

function percent(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value);
}

function changePercent(current: number, previous: number) {
  if (previous <= 0) return 0;
  return (current - previous) / previous;
}

function sum(records: SaleRecord[], key: 'revenue' | 'cost' | 'orders' | 'customers') {
  return records.reduce((total, record) => total + record[key], 0);
}

function filterByDimension(
  records: SaleRecord[],
  region: 'all' | Region,
  channel: 'all' | Channel,
  category: 'all' | Category,
) {
  return records
    .filter((record) => region === 'all' || record.region === region)
    .filter((record) => channel === 'all' || record.channel === channel)
    .filter((record) => category === 'all' || record.category === category);
}

function Delta({ value }: { value: number }) {
  const positive = value >= 0;

  return (
    <span className={positive ? styles.deltaPositive : styles.deltaNegative}>
      {positive ? '↗' : '↘'} {Math.abs(value * 100).toFixed(1)}%
    </span>
  );
}

function LineChart({
  values,
}: {
  values: Array<{ label: string; value: number }>;
}) {
  const width = 760;
  const height = 238;
  const padX = 18;
  const padY = 22;
  const max = Math.max(...values.map((item) => item.value), 1);
  const min = Math.min(...values.map((item) => item.value), 0);
  const range = Math.max(max - min, 1);
  const points = values.map((item, index) => {
    const x =
      values.length === 1
        ? width / 2
        : padX + (index / (values.length - 1)) * (width - padX * 2);
    const y = height - padY - ((item.value - min) / range) * (height - padY * 2);
    return { ...item, x, y };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');
  const area = `${padX},${height - padY} ${polyline} ${width - padX},${height - padY}`;

  return (
    <div className={styles.lineChart}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Evolução do faturamento">
        <defs>
          <linearGradient id="bi-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity=".26" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className={styles.gridLines}>
          {[0.2, 0.4, 0.6, 0.8].map((position) => (
            <line
              key={position}
              x1="0"
              x2={width}
              y1={height * position}
              y2={height * position}
            />
          ))}
        </g>
        <polygon points={area} fill="url(#bi-area)" />
        <polyline points={polyline} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="4" className={styles.chartPoint}>
            <title>{point.label}: {currency(point.value)}</title>
          </circle>
        ))}
      </svg>
      <div className={styles.chartLabels}>
        {values.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

export function BiDashboard() {
  const [period, setPeriod] = useState<Period>('12m');
  const [region, setRegion] = useState<'all' | Region>('all');
  const [channel, setChannel] = useState<'all' | Channel>('all');
  const [category, setCategory] = useState<'all' | Category>('all');

  const analytics = useMemo(() => {
    const months = PERIOD_LENGTH[period];
    const currentStart = MONTHS.length - months;
    const previousStart = currentStart - months;

    const current = filterByDimension(
      SALES.filter((record) => record.monthIndex >= currentStart),
      region,
      channel,
      category,
    );
    const previous = filterByDimension(
      SALES.filter(
        (record) =>
          record.monthIndex >= Math.max(previousStart, 0) &&
          record.monthIndex < currentStart,
      ),
      region,
      channel,
      category,
    );

    const revenue = sum(current, 'revenue');
    const previousRevenue = sum(previous, 'revenue');
    const cost = sum(current, 'cost');
    const orders = sum(current, 'orders');
    const previousOrders = sum(previous, 'orders');
    const customers = sum(current, 'customers');
    const margin = revenue > 0 ? (revenue - cost) / revenue : 0;
    const previousCost = sum(previous, 'cost');
    const previousMargin =
      previousRevenue > 0 ? (previousRevenue - previousCost) / previousRevenue : 0;
    const ticket = orders > 0 ? revenue / orders : 0;
    const previousTicket = previousOrders > 0 ? previousRevenue / previousOrders : 0;
    const target = previousRevenue > 0 ? previousRevenue * 1.08 : revenue * 1.04;

    const monthly = MONTHS.slice(currentStart).map((month) => ({
      label: month.label,
      value: sum(
        current.filter((record) => record.monthIndex === month.index),
        'revenue',
      ),
    }));

    const byRegion = REGIONS.map((item) => ({
      label: item,
      value: sum(current.filter((record) => record.region === item), 'revenue'),
    })).sort((a, b) => b.value - a.value);

    const byChannel = CHANNELS.map((item) => ({
      label: item,
      value: sum(current.filter((record) => record.channel === item), 'revenue'),
    })).sort((a, b) => b.value - a.value);

    const byCategory = CATEGORIES.map((item) => {
      const records = current.filter((record) => record.category === item);
      const categoryRevenue = sum(records, 'revenue');
      const categoryCost = sum(records, 'cost');

      return {
        label: item,
        revenue: categoryRevenue,
        orders: sum(records, 'orders'),
        margin:
          categoryRevenue > 0
            ? (categoryRevenue - categoryCost) / categoryRevenue
            : 0,
      };
    }).sort((a, b) => b.revenue - a.revenue);

    return {
      current,
      revenue,
      revenueDelta: changePercent(revenue, previousRevenue),
      margin,
      marginDelta: margin - previousMargin,
      orders,
      ordersDelta: changePercent(orders, previousOrders),
      customers,
      ticket,
      ticketDelta: changePercent(ticket, previousTicket),
      targetAttainment: target > 0 ? revenue / target : 0,
      monthly,
      byRegion,
      byChannel,
      byCategory,
    };
  }, [category, channel, period, region]);

  const maxRegion = Math.max(...analytics.byRegion.map((item) => item.value), 1);
  const totalChannel = analytics.byChannel.reduce((total, item) => total + item.value, 0);
  const bestRegion = analytics.byRegion[0];
  const bestCategory = analytics.byCategory[0];

  const exportCsv = () => {
    const header = ['Mês', 'Região', 'Canal', 'Categoria', 'Faturamento', 'Custo', 'Pedidos', 'Clientes'];
    const rows = analytics.current.map((record) => [
      record.month,
      record.region,
      record.channel,
      record.category,
      record.revenue,
      record.cost,
      record.orders,
      record.customers,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(';'))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bi-dashboard-dados.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <header className={styles.topbar}>
        <Link className={styles.backLink} href="/">
          <span aria-hidden="true">←</span>
          Portfólio
        </Link>
        <div className={styles.liveBadge}>
          <span />
          Demo interativa
        </div>
      </header>

      <div className={styles.shell}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Business Intelligence · Comercial</p>
            <h1>BI Analytics Dashboard</h1>
            <p className={styles.subtitle}>
              Visão executiva de faturamento, margem, pedidos, canais e desempenho regional.
              Dados demonstrativos processados integralmente no navegador.
            </p>
          </div>
          <button className={styles.exportButton} type="button" onClick={exportCsv}>
            <span aria-hidden="true">⇩</span>
            Exportar CSV
          </button>
        </section>

        <section className={styles.filters} aria-label="Filtros do dashboard">
          <label>
            <span>Período</span>
            <select value={period} onChange={(event) => setPeriod(event.target.value as Period)}>
              <option value="3m">Últimos 3 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="12m">Últimos 12 meses</option>
            </select>
          </label>

          <label>
            <span>Região</span>
            <select value={region} onChange={(event) => setRegion(event.target.value as 'all' | Region)}>
              <option value="all">Todas as regiões</option>
              {REGIONS.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>
            <span>Canal</span>
            <select value={channel} onChange={(event) => setChannel(event.target.value as 'all' | Channel)}>
              <option value="all">Todos os canais</option>
              {CHANNELS.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>
            <span>Categoria</span>
            <select value={category} onChange={(event) => setCategory(event.target.value as 'all' | Category)}>
              <option value="all">Todas as categorias</option>
              {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </section>

        <section className={styles.kpis} aria-label="Indicadores principais">
          <article className={styles.kpiCard}>
            <div className={styles.kpiIcon}>R$</div>
            <p>Faturamento</p>
            <strong>{compactCurrency(analytics.revenue)}</strong>
            <Delta value={analytics.revenueDelta} />
          </article>

          <article className={styles.kpiCard}>
            <div className={styles.kpiIcon}>%</div>
            <p>Margem bruta</p>
            <strong>{percent(analytics.margin)}</strong>
            <Delta value={analytics.marginDelta} />
          </article>

          <article className={styles.kpiCard}>
            <div className={styles.kpiIcon}>#</div>
            <p>Pedidos</p>
            <strong>{integer(analytics.orders)}</strong>
            <Delta value={analytics.ordersDelta} />
          </article>

          <article className={styles.kpiCard}>
            <div className={styles.kpiIcon}>↗</div>
            <p>Ticket médio</p>
            <strong>{currency(analytics.ticket)}</strong>
            <Delta value={analytics.ticketDelta} />
          </article>

          <article className={styles.kpiCard}>
            <div className={styles.kpiIcon}>◎</div>
            <p>Atingimento da meta</p>
            <strong>{percent(analytics.targetAttainment)}</strong>
            <span className={styles.kpiMeta}>{integer(analytics.customers)} clientes</span>
          </article>
        </section>

        <section className={styles.dashboardGrid}>
          <article className={styles.panel + ' ' + styles.revenuePanel}>
            <div className={styles.panelHeader}>
              <div>
                <p>Evolução</p>
                <h2>Faturamento mensal</h2>
              </div>
              <strong>{currency(analytics.revenue)}</strong>
            </div>
            <LineChart values={analytics.monthly} />
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p>Participação</p>
                <h2>Receita por região</h2>
              </div>
            </div>
            <div className={styles.barList}>
              {analytics.byRegion.map((item) => (
                <div className={styles.barRow} key={item.label}>
                  <div>
                    <span>{item.label}</span>
                    <strong>{compactCurrency(item.value)}</strong>
                  </div>
                  <div className={styles.barTrack}>
                    <span style={{ width: `${(item.value / maxRegion) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p>Mix comercial</p>
                <h2>Canais de venda</h2>
              </div>
            </div>
            <div className={styles.channelList}>
              {analytics.byChannel.map((item, index) => {
                const share = totalChannel > 0 ? item.value / totalChannel : 0;
                return (
                  <div className={styles.channelRow} key={item.label}>
                    <span className={styles.channelIndex}>0{index + 1}</span>
                    <div>
                      <strong>{item.label}</strong>
                      <small>{percent(share)} da receita</small>
                    </div>
                    <b>{compactCurrency(item.value)}</b>
                  </div>
                );
              })}
            </div>
          </article>

          <article className={styles.panel + ' ' + styles.tablePanel}>
            <div className={styles.panelHeader}>
              <div>
                <p>Performance</p>
                <h2>Categorias</h2>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Faturamento</th>
                    <th>Pedidos</th>
                    <th>Margem</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.byCategory.map((item) => (
                    <tr key={item.label}>
                      <td>{item.label}</td>
                      <td>{currency(item.revenue)}</td>
                      <td>{integer(item.orders)}</td>
                      <td>
                        <span className={styles.marginPill}>{percent(item.margin)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className={styles.insights}>
          <div>
            <span className={styles.insightIcon}>◆</span>
            <div>
              <p>Melhor região</p>
              <strong>{bestRegion?.label ?? '—'}</strong>
              <small>{bestRegion ? currency(bestRegion.value) : 'Sem dados no filtro atual'}</small>
            </div>
          </div>
          <div>
            <span className={styles.insightIcon}>◇</span>
            <div>
              <p>Categoria líder</p>
              <strong>{bestCategory?.label ?? '—'}</strong>
              <small>{bestCategory ? percent(bestCategory.margin) + ' de margem' : 'Sem dados no filtro atual'}</small>
            </div>
          </div>
          <div>
            <span className={styles.insightIcon}>△</span>
            <div>
              <p>Tendência de receita</p>
              <strong>{analytics.revenueDelta >= 0 ? 'Crescimento' : 'Retração'}</strong>
              <small>{Math.abs(analytics.revenueDelta * 100).toFixed(1)}% vs. período anterior</small>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>Next.js · React · TypeScript</span>
          <span>Projeto demonstrativo para portfólio</span>
        </footer>
      </div>
    </main>
  );
}
