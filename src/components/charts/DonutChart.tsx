import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface SeverityItem {
  name: string;
  value: number;
  color: string;
  textColorClassName: string;
  calloutPosClassName: string;
}

const severityData: SeverityItem[] = [
  {
    name: "Low Severity",
    value: 25,
    color: "#00B7FF",
    textColorClassName: "text-sky",
    calloutPosClassName: "right-2 top-4",
  },
  {
    name: "High Severity",
    value: 46,
    color: "#3939FF",
    textColorClassName: "text-brand",
    calloutPosClassName: "left-25 bottom-18",
  },
  {
    name: "Med Severity",
    value: 29,
    color: "#00C98D",
    textColorClassName: "text-success",
    calloutPosClassName: "left-1 top-4",
  },
];

function Callout({
  value,
  label,
  textColorClassName,
  posClassName,
}: {
  value: string;
  label: string;
  textColorClassName: string;
  posClassName: string;
}) {
  return (
    <div
      className={`absolute w-max max-w-[110px] rounded-md bg-[#D9F4FF] px-2.5 py-1.5 text-center text-[10px] leading-tight shadow-sm transition-opacity duration-150 ${textColorClassName} ${posClassName}`}
    >
      <div className="font-bold">{value}</div>
      <div>{label}</div>
    </div>
  );
}

export default function SeverityChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? severityData[activeIndex] : null;

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
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {severityData.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={item.color}
                  opacity={active === null || active.name === item.name ? 1 : 0.35}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  style={{ cursor: "pointer", transition: "opacity 150ms" }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Only the hovered segment's callout is shown */}
      {active && (
        <Callout
          value={`${active.value} %`}
          label={active.name}
          textColorClassName={active.textColorClassName}
          posClassName={active.calloutPosClassName}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] text-navy/55">
        {severityData.map((item, index) => (
          <span
            key={item.name}
            className={`flex cursor-pointer items-center gap-1 transition-opacity ${
              active && active.name !== item.name ? "opacity-40" : "opacity-100"
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
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