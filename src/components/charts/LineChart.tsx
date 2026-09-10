// components/charts/CyberCatchScoreChart.tsx
import {
  LineChart as ReChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScorePoint {
  name: string;
  prev: number;
  avg: number;
  date: string;
}

const catchScoreData: ScorePoint[] = [
  { name: "Mon", prev: 44, avg: 36, date: "02.08.2021 12:00" },
  { name: "Tue", prev: 52, avg: 40, date: "03.08.2021 12:00" },
  { name: "Wed", prev: 38, avg: 48, date: "04.08.2021 12:00" },
  { name: "Thu", prev: 58, avg: 32, date: "05.08.2021 12:00" },
  { name: "Fri", prev: 34, avg: 46, date: "06.08.2021 12:00" },
  { name: "Sat", prev: 46, avg: 30, date: "07.08.2021 12:00" },
  { name: "Sun", prev: 40, avg: 38, date: "08.08.2021 12:00" },
];

const seriesStyle = {
  prev: {
    label: "Previous Test Run",
    stroke: "#3939FF",
    boxClass: "bg-[#EDEDFF] text-brand",
  },
  avg: {
    label: "Average Client",
    stroke: "#00B7FF",
    boxClass: "bg-[#E5F8FF] text-sky",
  },
} as const;

type SeriesKey = keyof typeof seriesStyle;

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as ScorePoint;
  return (
    <div className="min-w-[150px] rounded-xl border border-[#e5e6ef] bg-white px-3 py-2.5 text-left shadow-[0_8px_22px_rgba(15,41,64,0.14)]">
      <div className="text-[10px] font-semibold text-navy/60">{label} · {point.date}</div>
      <div className="mt-2 space-y-1.5">
        {payload.map((entry: any) => {
          const style = seriesStyle[entry.dataKey as SeriesKey];
          return <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-[11px] text-navy"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: style.stroke }} />{style.label}</span><b>{entry.value}</b></div>;
        })}
      </div>
    </div>
  );
}

export default function CyberCatchScoreChart() {
  return (
    <div className="h-full flex flex-col rounded-xl sm:rounded-2xl border border-gray-light bg-white-pure p-3 shadow-[0_2px_12px_rgba(15,41,64,0.06)] min-w-0">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
        <h3 className="text-xs font-bold text-navy">CyberCatch Score</h3>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-brand">All</span>
          <span className="px-2 py-0.5 rounded-full bg-brand text-white font-semibold">
            D
          </span>
          <span className="text-brand">W</span>
          <span className="text-brand">M</span>
          <span className="text-brand">Custom</span>
        </div>
      </div>

      {/* Chart — flex-1 so it grows/shrinks to fill whatever height the card gets */}
      <div className="relative flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <ReChart data={catchScoreData}>
            <XAxis
              dataKey="name"
              stroke="#AAAAAA"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide domain={[0, 70]} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#E5E6EF", strokeWidth: 1 }}
              wrapperStyle={{ outline: "none" }}
            />
            <Line
              type="monotone"
              dataKey="prev"
              stroke={seriesStyle.prev.stroke}
              strokeWidth={1.8}
              dot={false}
              activeDot={{
                r: 4,
                fill: seriesStyle.prev.stroke,
                stroke: "#fff",
                strokeWidth: 1.5,
              }}
            />
            <Line
              type="monotone"
              dataKey="avg"
              stroke={seriesStyle.avg.stroke}
              strokeWidth={1.8}
              dot={false}
              activeDot={{
                r: 4,
                fill: seriesStyle.avg.stroke,
                stroke: "#fff",
                strokeWidth: 1.5,
              }}
            />
          </ReChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center text-[11px] text-navy/60 mt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand" />{" "}
          {seriesStyle.prev.label}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky" />{" "}
          {seriesStyle.avg.label}
        </span>
      </div>
    </div>
  );
}
