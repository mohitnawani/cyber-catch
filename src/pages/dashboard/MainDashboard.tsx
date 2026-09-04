import { LineChart as ReChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp } from 'lucide-react'

// Data matching screenshots + palette #BF0606 #00B7FF #02A64D #3939FF
const catchScoreData = [
  { name: 'Mon', prev: 42, avg: 38 },
  { name: 'Tue', prev: 48, avg: 44 },
  { name: 'Wed', prev: 35, avg: 52 },
  { name: 'Thu', prev: 55, avg: 40 },
  { name: 'Fri', prev: 30, avg: 50 },
  { name: 'Sat', prev: 45, avg: 35 },
  { name: 'Sun', prev: 38, avg: 42 },
]
const severityData = [
  { name: 'High', value: 35, color: '#3939FF' },
  { name: 'Medium', value: 40, color: '#02A64D' },
  { name: 'Low', value: 25, color: '#BF0606' },
]
const benchmarkData = [
  { name: 'A', v: 22 }, { name: 'B', v: 38 }, { name: 'C', v: 28 }, { name: 'D', v: 44 }, { name: 'E', v: 18 }, { name: 'F', v: 52 }, { name: 'G', v: 30 }, { name: 'H', v: 46 }, { name: 'I', v: 26 }, { name: 'J', v: 34 }, { name: 'K', v: 16 },
]
const productData = [
  { name: 'Product 1', v: 42 }, { name: 'Product 2', v: 68 }, { name: 'Product 3', v: 34 }, { name: 'Product 4', v: 64 }, { name: 'Product 5', v: 28 },
]

function Panel({ title, children, className = '', action }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-gradient-to-br from-[#0F2940] to-[#0B2A4A] p-4 backdrop-blur shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.4)] ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white/90">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

function SevenPillars() {
  return (
    <div className="relative h-[190px] flex items-center justify-center overflow-hidden">
      {/* glow */}
      <div className="absolute w-40 h-40 rounded-full bg-sky/20 blur-2xl" />
      {/* circles venn - 4 overlaps */}
      <div className="absolute w-24 h-24 rounded-full bg-[#3939FF]/70 left-[18%] top-[32%] border border-white/10" />
      <div className="absolute w-24 h-24 rounded-full bg-success/70 left-[42%] top-[14%] border border-white/10" />
      <div className="absolute w-24 h-24 rounded-full bg-sky/70 right-[18%] top-[32%] border border-white/10" />
      <div className="absolute w-28 h-20 rounded-full bg-danger/70 left-[30%] bottom-[18%] border border-white/10" style={{ borderRadius: '50% / 50%' }} />
      {/* outer rings */}
      <div className="absolute w-36 h-36 rounded-full border-2 border-white/15" />
      <div className="absolute w-28 h-28 rounded-full border-2 border-white/25" />
      <div className="absolute w-20 h-20 rounded-full border border-white/10 bg-white/5" />
      <div className="absolute text-[10px] text-white/60 top-2 left-1/2 -translate-x-1/2 tracking-widest">7 Pillars</div>
    </div>
  )
}

export default function MainDashboard() {
  return (
    <div className="space-y-4">
      {/* grid 12 col */}
      <div className="grid grid-cols-12 gap-4">
        {/* Row 1 */}
        <Panel
          title="CyberCatch Score"
          className="col-span-12 lg:col-span-6"
          action={<div className="flex gap-1.5 text-[10px]"><span className="px-2 py-0.5 rounded-full bg-white/10">All</span><span className="px-2 py-0.5 rounded-full bg-brand text-white">D</span><span className="px-2 py-0.5 rounded-full bg-white/5">W</span><span className="px-2 py-0.5 rounded-full bg-white/5">M</span><span className="px-2 py-0.5 rounded-full bg-white/5">Custom</span></div>}
        >
          <div className="h-[168px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReChart data={catchScoreData}>
                <XAxis dataKey="name" stroke="#6B8AA8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#0F2940', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="prev" stroke="#3939FF" strokeWidth={2} dot={{ r: 3, fill: '#3939FF' }} />
                <Line type="monotone" dataKey="avg" stroke="#02A64D" strokeWidth={2} dot={{ r: 3, fill: '#02A64D' }} />
              </ReChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-1 text-[11px] text-white/60 justify-center">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand" /> Previous Test Run</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Average Client</span>
          </div>
        </Panel>

        <Panel title="CyberPhisher Severity Breakdown" className="col-span-12 lg:col-span-3 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={severityData} innerRadius={52} outerRadius={72} dataKey="value" stroke="none" paddingAngle={2}>
                  {severityData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0F2940', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-white/70">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#3939FF' }} /> High Severity</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> Low Severity</span>
            <span className="flex items-center gap-1 col-span-2"><span className="w-2 h-2 rounded-full bg-success" /> Med Severity</span>
          </div>
        </Panel>

        <Panel title="7 Pillars" className="col-span-12 lg:col-span-3">
          <SevenPillars />
        </Panel>

        {/* Row 2 - small scores + total tests + breach */}
        <div className="col-span-12 lg:col-span-6 grid grid-cols-3 gap-4 content-start">
          {[
            { v: '464', label: 'Cyber X-Ray Score' },
            { v: '126', label: 'CyberCheck247 Score' },
            { v: '356', label: 'CyberPhisher Score' },
          ].map(c => (
            <div key={c.label} className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0F2940] to-[#12365E] p-4 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-sky flex items-center gap-1"><TrendingUp size={14} className="text-success" />{c.v}</div>
              <div className="text-[11px] text-white/60 leading-tight mt-1">{c.label}</div>
            </div>
          ))}
          <Panel title="CyberBenchmark" className="col-span-3 !p-3">
            <div className="h-[132px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData}>
                  <Bar dataKey="v" fill="#3939FF" radius={[4, 4, 0, 0]} />
                  <Tooltip contentStyle={{ background: '#0F2940', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <Panel title="Total Test Conducted by Product" className="col-span-12 lg:col-span-4">
          <div className="h-[228px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <XAxis dataKey="name" stroke="#6B8AA8" fontSize={9} tickLine={false} axisLine={false} interval={0} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#0F2940', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="v" fill="#3939FF" radius={[6, 6, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="col-span-12 lg:col-span-2 rounded-xl border border-white/10 bg-gradient-to-br from-[#0F2940] to-[#0B2A4A] p-4 flex flex-col justify-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">73</div>
            <div className="text-[11px] text-white/50">Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5 %</div>
            <div className="text-[11px] text-white/50">Potential breakdown</div>
            <div className="text-[10px] text-white/30 mt-1">Cyber Breach Score</div>
          </div>
        </div>
      </div>

      {/* Light variant preview - matches Image 2 */}
      <div className="rounded-xl border border-gray-light bg-white-pure p-3">
        <div className="text-xs font-semibold text-navy mb-2">Light theme preview (Image 2) — same layout, palette swaps to white bg. Toggle by adding <code className="px-1 bg-gray-light rounded">bg-white</code> to panels.</div>
        <div className="h-1 w-full bg-gradient-to-r from-brand via-success to-danger rounded-full opacity-60" />
      </div>
    </div>
  )
}
