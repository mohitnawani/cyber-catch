import {
  BarChart3,
  Cloud,
  Eye,
  Server,
  Settings2,
  Users,
  Wifi,
} from "lucide-react";

interface BigCircle {
  name: string;
  className: string;
}

interface Pillar {
  name: string;
  icon: React.ElementType;
  className: string;
}

const bigCircles: BigCircle[] = [
  { name: "Data Top", className: "left-[101px] top-[101px] bg-success/40" },
  { name: "Data Bottom", className: "left-[101px] top-0 bg-success/40" },
  { name: "People", className: "left-0 top-[101px] bg-slate-400/50" },
  { name: "Networks", className: "right-0 top-[101px] bg-sky/50" },
  { name: "Devices", className: "left-[101px] bottom-0 bg-danger/45" },
];

const pillars: Pillar[] = [
  {
    name: "Workloads",
    icon: Cloud,
    className: "left-1/2 top-[4%] -translate-x-1/2 bg-success",
  },
  {
    name: "Visibility & Analytics",
    icon: Eye,
    className: "left-1/2 top-[17%] -translate-x-1/2 bg-success",
  },
  {
    name: "People",
    icon: Users,
    className: "left-[6%] top-1/2 -translate-y-1/2 bg-[#0F2940]",
  },
  {
    name: "Data",
    icon: BarChart3,
    className: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-success",
  },
  {
    name: "Networks",
    icon: Wifi,
    className: "right-[6%] top-1/2 -translate-y-1/2 bg-sky",
  },
  {
    name: "Automatio & Orchestration",
    icon: Settings2,
    className: "left-1/2 bottom-[17%] -translate-x-1/2 bg-success",
  },
  {
    name: "Devices",
    icon: Server,
    className: "left-1/2 bottom-[4%] -translate-x-1/2 bg-danger",
  },
];

function SevenPillars() {
  return (
    <div className="relative h-full w-full max-w-[332px] mx-auto overflow-hidden">
      {/* outer rings */}
      <div className="absolute left-1/2 top-1/2 h-[332px] w-[332px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[13px] border-success/60" />
      <div className="absolute left-1/2 top-1/2 h-[263px] w-[263px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[13px] border-success/60 z-10" />

      {/* venn circles */}
      {bigCircles.map((circle) => (
        <div
          key={circle.name}
          className={`absolute h-[130px] w-[130px] rounded-full ${circle.className}`}
        />
      ))}

      {/* pill labels */}
      {pillars.map((pillar) => {
        const Icon = pillar.icon;
        return (
          <div
            key={pillar.name}
            className={`absolute z-10 flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[7px] font-medium text-white shadow-sm ${pillar.className}`}
          >
            <Icon className="h-2.5 w-2.5 shrink-0" />
            {pillar.name}
          </div>
        );
      })}
    </div>
  );
}

export default SevenPillars;
