// components/charts/CyberCatchScoreChart.tsx
import { LineChart as ReChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface ScorePoint {
  name: string
  prev: number
  avg: number
}

const catchScoreData: ScorePoint[] = [
  { name: 'Mon', prev: 44, avg: 36 },
  { name: 'Tue', prev: 52, avg: 40 },
  { name: 'Wed', prev: 38, avg: 48 },
  { name: 'Thu', prev: 58, avg: 32 },
  { name: 'Fri', prev: 34, avg: 46 },
  { name: 'Sat', prev: 46, avg: 30 },
  { name: 'Sun', prev: 40, avg: 38 },
]

export default function CyberCatchScoreChart() {
  return (
    <div className="rounded-2xl border border-gray-light bg-white-pure p-4 shadow-[0_2px_12px_rgba(15,41,64,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-bold text-navy">CyberCatch Score</h3>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-brand">All</span>
          <span className="px-2.5 py-1 rounded-full bg-brand text-white font-semibold">D</span>
          <span className="text-brand">W</span>
          <span className="text-brand">M</span>
          <span className="text-brand">Custom</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <ReChart data={catchScoreData}>
            <XAxis dataKey="name" stroke="#AAAAAA" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide domain={[0, 70]} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EEEEEE', borderRadius: 10, fontSize: 11, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
            <Line type="monotone" dataKey="prev" stroke="#3939FF" strokeWidth={1.8} dot={false} />
            <Line type="monotone" dataKey="avg" stroke="#00B7FF" strokeWidth={1.8} dot={false} />
          </ReChart>
        </ResponsiveContainer>

      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center text-[11px] text-navy/60 mt-2">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand" /> Previous Test Run</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky" /> Average Client</span>
      </div>
    </div>
  )
}