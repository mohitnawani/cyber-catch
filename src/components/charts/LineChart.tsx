import { LineChart as ReChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [{name:'Jan',v:40},{name:'Feb',v:55},{name:'Mar',v:48}]

export default function LineChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReChart data={data}>
        <XAxis dataKey="name" stroke="#666"/>
        <YAxis stroke="#666"/>
        <Tooltip/>
        <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2}/>
      </ReChart>
    </ResponsiveContainer>
  )
}
