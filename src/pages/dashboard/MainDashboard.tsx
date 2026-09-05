import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart as ReChart, Line } from 'recharts'
import CyberCatchScoreChart from '../../components/charts/LineChart'
import SeverityChart from '../../components/charts/DonutChart'

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

function Card({ title, action, children, className = '' }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gray-light bg-white-pure p-4 shadow-[0_2px_12px_rgba(15,41,64,0.06)] ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-bold text-navy">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

function SevenPillars() {
  return (
    <div className="relative h-[190px] flex items-center justify-center overflow-hidden">
      <div className="absolute w-[168px] h-[168px] rounded-full border-[5px] border-success/50" />
      <div className="absolute w-[132px] h-[168px] rounded-full border-[5px] border-success/30" />
      <div className="absolute w-16 h-16 rounded-full bg-[#0F2940]/80 left-[14%] top-[36%] flex items-center justify-center text-[7px] text-white">People</div>
      <div className="absolute w-14 h-14 rounded-full bg-success/80 left-[36%] top-[14%] flex items-center justify-center text-[6px] text-white text-center leading-none">Networks</div>
      <div className="absolute w-16 h-16 rounded-full bg-sky/70 right-[14%] top-[36%] flex items-center justify-center text-[7px] text-white">Resiliency</div>
      <div className="absolute w-14 h-14 rounded-full bg-danger left-[34%] bottom-[28%] flex items-center justify-center text-[6px] text-white">Gaps</div>
      <div className="absolute w-9 h-9 rounded-full bg-[#0F2940] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[6px] text-white">Data</div>
      <div className="absolute px-1.5 py-0.5 rounded-full bg-success text-white text-[7px] top-[22%] left-1/2 -translate-x-1/2">Wealth & Analytics</div>
      <div className="absolute px-1.5 py-0.5 rounded-full bg-success text-white text-[7px] bottom-[22%] left-1/2 -translate-x-1/2">Automatic & Orchestration</div>
    </div>
  )
}

export default function MainDashboard() {
  return (
    <div className="space-y-4 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-12 lg:col-span-5 order-1">
          <CyberCatchScoreChart />
        </div>

        <Card title="Total Test Conducted by Product" className="col-span-12 lg:col-span-4 order-3">
          <div className="h-[190px]">
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

        <div className="col-span-12 lg:col-span-5 order-4 grid grid-cols-3 gap-2" style={{ paddingLeft: '4px' }}>
          {[
            { v: '464', label: 'Cyber X-Ray Score', color: 'text-brand', bg: 'bg-brand/10' },
            { v: '126', label: 'CyberCheck24x7 Score', color: 'text-brand', bg: 'bg-brand/10' },
            { v: '356', label: 'CyberPhisher Score', color: 'text-brand', bg: 'bg-brand/10' },
          ].map(c => (
            <div key={c.label} className="min-w-0 rounded-2xl border border-gray-light bg-white-pure p-4 flex flex-col justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ height: '123px' }}>
              <div className={`text-5xl font-bold ${c.color}`} style={{ fontFamily: '"D-DIN", "DIN Alternate", "Montserrat", sans-serif', fontWeight: '400', lineHeight: '1', letterSpacing: '0%' }}>{c.v}</div>
              <div className="text-[11px] text-navy mt-1 leading-tight flex items-center gap-1">{c.label}</div>
            </div>
          ))}
        </div>

        <Card title="CyberPhisher Severity Breakdown" className="col-span-12 lg:col-span-3 order-2">
          <SeverityChart />
        </Card>

        <Card title="7 Pillars" className="col-span-12 lg:col-span-5 order-5 row-span-2">
          <SevenPillars />
        </Card>

        <Card title="Cyber Breach Score" className="col-span-12 lg:col-span-2 order-6 row-span-2 flex flex-col justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand">73</div><div className="text-xs text-gray-mid">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand">5 %</div><div className="text-xs text-gray-mid">Potential breakdown</div>
          </div>
        </Card>

        <Card title="CyberBenchmark" className="col-span-12 lg:col-span-5 order-7" action={<div className="flex gap-2 text-[11px]"><span className="text-gray-mid">All</span><span className="px-2 py-0.5 rounded-full bg-brand text-white">D</span><span className="text-gray-mid">W</span><span className="text-gray-mid">M</span><span className="text-gray-mid">Custom</span></div>}>
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReChart data={catchScoreData}>
                <XAxis dataKey="name" stroke="#AAAAAA" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EEEEEE', borderRadius: 8 }} />
                <Line type="monotone" dataKey="prev" stroke="#3939FF" strokeWidth={1.6} dot={false} />
                <Line type="monotone" dataKey="avg" stroke="#00B7FF" strokeWidth={1.6} dot={false} />
              </ReChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center text-[11px] text-navy/60">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand" /> Cyber Breach Score</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky" /> CyberCheck24x7 Score</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
