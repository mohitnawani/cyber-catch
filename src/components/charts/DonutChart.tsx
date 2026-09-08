import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface SeverityItem {
  name: string;
  value: number;
  color: string;
  calloutClassName: string;
}

const severityData: SeverityItem[] = [
  {
    name: "Low Severity",
    value: 25,
    color: "#00B7FF",
    calloutClassName: "right-0 top-3 bg-sky/10 text-sky",
  },
  {
    name: "High Severity",
    value: 46,
    color: "#3939FF",
    calloutClassName: "left-0 top-[95px] bg-brand/10 text-brand",
  },
  {
    name: "Med Severity",
    value: 25,
    color: "#00C98D",
    calloutClassName: "right-0 top-[128px] bg-success/10 text-success",
  },
];

function Callout({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`absolute rounded-md px-2 py-1 text-center text-[8px] leading-tight shadow-sm ${className}`}
    >
      <div className="font-bold">{value}</div>
      <div>{label}</div>
    </div>
  );
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
              {severityData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {severityData.map((item) => (
        <Callout
          key={item.name}
          value={`${item.value} %`}
          label={item.name}
          className={item.calloutClassName}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[8px] text-navy/55">
        {severityData.map((item) => (
          <span key={item.name} className="flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}