import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart as ReChart, Line } from 'recharts'
import CyberCatchScoreChart from '../../components/charts/LineChart'
import SeverityChart from '../../components/charts/DonutChart'
import SevenPillars from '../../components/charts/SevenPillars'

const catchScoreData = [
  { name: 'Mon', prev: 44, avg: 36 },
  { name: 'Tue', prev: 52, avg: 40 },
  { name: 'Wed', prev: 38, avg: 48 },
  { name: 'Thu', prev: 58, avg: 32 },
  { name: 'Fri', prev: 34, avg: 46 },
  { name: 'Sat', prev: 46, avg: 30 },
  { name: 'Sun', prev: 40, avg: 38 },
]
const productData = [
  { name: 'Product 1', v: 32, color: '#3939FF' },
  { name: 'Product 2', v: 58, color: '#00B7FF' },
  { name: 'Product 3', v: 42, color: '#A78BFA' },
  { name: 'Product 4', v: 64, color: '#02A64D' },
]

function BenchmarkTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return <div className="min-w-[150px] rounded-xl border border-[#e5e6ef] bg-white px-3 py-2.5 shadow-[0_8px_22px_rgba(15,41,64,0.14)]"><p className="text-[10px] font-semibold text-navy/60">{label}</p><div className="mt-2 space-y-1.5 text-[11px] text-navy"><p className="flex items-center justify-between gap-4"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-brand" />Cyber Breach</span><b>{payload.find((item: any) => item.dataKey === 'prev')?.value}</b></p><p className="flex items-center justify-between gap-4"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-sky" />CyberCheck24x7</span><b>{payload.find((item: any) => item.dataKey === 'avg')?.value}</b></p></div></div>
}

function Card({ title, action, children, className = '' }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl sm:rounded-2xl border border-gray-light bg-white-pure p-3 shadow-[0_2px_12px_rgba(15,41,64,0.06)] min-w-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
        <h3 className="text-xs font-bold text-navy">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}


export default function MainDashboard() {
  return (
    <div className="mx-auto w-full max-w-[1280px] overflow-x-hidden pb-4">
      <div className="grid grid-cols-12 gap-3 sm:gap-4">

        <div className="col-span-12 md:col-span-6 lg:col-span-5 order-1 min-w-0">
          <CyberCatchScoreChart />
        </div>

        <Card title="Total Test Conducted by Product" className="order-3 col-span-12 md:col-span-6 lg:col-span-4">
          <div className="h-[160px] sm:h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData} barCategoryGap={18}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#F6F7F9' }} contentStyle={{ background: '#fff', border: '1px solid #EEEEEE', borderRadius: 8 }} />
                <Bar dataKey="v" radius={[8, 8, 0, 0]} barSize={18}>
                  {productData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px] text-navy/60">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-brand" /> Product 1</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-sky" /> Product 2</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-violet-400" /> Product 3</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-success" /> Product 4</span>
          </div>
        </Card>

        <div className="order-4 col-span-12 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:col-span-5">
          {[
            { v: '464', label: 'Cyber X-Ray Score', color: 'text-brand', bg: 'bg-brand/10' },
            { v: '126', label: 'CyberCheck24x7 Score', color: 'text-brand', bg: 'bg-brand/10' },
            { v: '356', label: 'CyberPhisher Score', color: 'text-brand', bg: 'bg-brand/10' },
          ].map(c => (
            <div key={c.label} className="flex min-h-[96px] min-w-0 flex-col justify-center rounded-xl border border-gray-light bg-white-pure p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:p-4">
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${c.color}`} style={{ fontFamily: '"D-DIN", "DIN Alternate", "Montserrat", sans-serif', fontWeight: '400', lineHeight: '1', letterSpacing: '0%' }}>{c.v}</div>
              <div className="text-[10px] sm:text-[11px] text-navy mt-1 leading-tight break-words">{c.label}</div>
            </div>
          ))}
        </div>

        <Card title="CyberPhisher Severity Breakdown" className="col-span-12 md:col-span-6 lg:col-span-3 order-2">
          <SeverityChart />
        </Card>

        <Card title="7 Pillars" className="order-5 col-span-12 md:col-span-6 lg:col-span-5 lg:row-span-2">
          <SevenPillars />
        </Card>

<Card title="Cyber Breach Score" className="order-6 col-span-12 flex flex-col gap-5 md:col-span-6 lg:col-span-2 lg:row-span-2">
  <div className="text-center">
    <div className="text-3xl sm:text-4xl lg:text-[44px] leading-none font-ddin text-brand">73</div>
    <div className="mt-0.5 text-xs sm:text-sm text-[#8181A5]">Cyber Breach Score</div>
  </div>
  <div className="text-center">
    <div className="text-3xl sm:text-4xl lg:text-[44px] leading-none text-brand">5 %</div>
    <div className="mt-0.5 text-xs sm:text-sm text-[#8181A5]">CyberCheck247 Score</div>
  </div>
</Card>
        <Card title="CyberBenchmark" className="order-7 col-span-12 lg:col-span-5" action={<div className="flex flex-wrap gap-1.5 text-[11px]"><span className="text-gray-mid">All</span><span className="rounded-full bg-brand px-2 py-0.5 text-white">D</span><span className="text-gray-mid">W</span><span className="text-gray-mid">M</span><span className="text-gray-mid">Custom</span></div>}>
          <div className="h-[150px] sm:h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReChart data={catchScoreData}>
                <XAxis dataKey="name" stroke="#AAAAAA" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip content={<BenchmarkTooltip />} cursor={{ stroke: '#e5e6ef', strokeWidth: 1 }} wrapperStyle={{ outline: 'none' }} />
                <Line type="monotone" dataKey="prev" stroke="#3939FF" strokeWidth={1.8} dot={false} activeDot={{ r: 4, fill: '#3939FF', stroke: '#fff', strokeWidth: 1.5 }} />
                <Line type="monotone" dataKey="avg" stroke="#00B7FF" strokeWidth={1.8} dot={false} activeDot={{ r: 4, fill: '#00B7FF', stroke: '#fff', strokeWidth: 1.5 }} />
              </ReChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center text-[11px] text-navy/60">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand" /> Cyber Breach Score</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky" /> CyberCheck24x7 Score</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
