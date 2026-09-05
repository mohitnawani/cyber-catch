import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const severityData = [
  { name: 'High Severity', value: 46, color: '#3939FF' },
  { name: 'Low Severity', value: 25, color: '#00B7FF' },
  { name: 'Med Severity', value: 25, color: '#00C98D' },
]

function Callout({ value, label, className }: { value: string; label: string; className: string }) {
  return <div className={`absolute rounded-md px-2 py-1 text-center text-[8px] leading-tight shadow-sm ${className}`}><div className="font-bold">{value}</div><div>{label}</div></div>
}

export default function SeverityChart() {
  return (
    <div className="relative mx-auto h-[236px] w-full max-w-[280px]">
      <div className="absolute inset-x-0 top-0 h-[192px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
          <Pie
            data={severityData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={49}
            outerRadius={70}
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {severityData.map((item) => <Cell key={item.name} fill={item.color} />)}
          </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <Callout value="25 %" label="Low Severity" className="right-0 top-3 bg-sky/10 text-sky" />
      <Callout value="46 %" label="High Severity" className="left-0 top-[95px] bg-brand/10 text-brand" />
      <Callout value="25 %" label="Med Severity" className="right-0 top-[128px] bg-success/10 text-success" />
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[8px] text-navy/55">
        {severityData.map((item) => <span key={item.name} className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>)}
      </div>
    </div>
  )
}
