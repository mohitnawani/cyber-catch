import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [{name:'High',value:30},{name:'Medium',value:50},{name:'Low',value:20}]
const colors = ['#ef4444','#f59e0b','#10b981']

export default function DonutChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} innerRadius={60} outerRadius={80} dataKey="value">
          {data.map((_,i)=><Cell key={i} fill={colors[i]}/>)}
        </Pie>
        <Tooltip/>
      </PieChart>
    </ResponsiveContainer>
  )
}
