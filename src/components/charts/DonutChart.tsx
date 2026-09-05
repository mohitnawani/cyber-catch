import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "High Severity",
    value: 46,
    color: "#3939FF",
  },
  {
    name: "Low Severity",
    value: 25,
    color: "#00B7FF",
  },
  {
    name: "Med Severity",
    value: 25,
    color: "#02A64D",
  },
];

export default function SeverityChart() {
  return (
    <div className="w-[300px] h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={0}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((item) => (
              <Cell
                key={item.name}
                fill={item.color}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}