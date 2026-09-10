import { useState } from 'react'
import {
  BarChart3,
  Cloud,
  Eye,
  Server,
  Settings2,
  Users,
  Wifi,
} from 'lucide-react'

interface Pillar {
  id: string
  name: string
  icon: React.ElementType
  className: string
  bgHover: string
  score: number
  description: string
}

const pillars: Pillar[] = [
  {
    id: 'workloads',
    name: 'Workloads',
    icon: Cloud,
    className: 'top-[4%] left-1/2 -translate-x-1/2 bg-success text-white',
    bgHover: 'ring-success/50',
    score: 88,
    description: 'Cloud & container workloads security posture',
  },
  {
    id: 'visibility',
    name: 'Visibility & Analytics',
    icon: Eye,
    className: 'top-[18%] left-1/2 -translate-x-1/2 bg-success text-white',
    bgHover: 'ring-success/50',
    score: 92,
    description: 'Continuous monitoring, telemetry & SIEM alerts',
  },
  {
    id: 'people',
    name: 'People',
    icon: Users,
    className: 'left-[4%] sm:left-[6%] top-1/2 -translate-y-1/2 bg-[#0F2940] text-white',
    bgHover: 'ring-navy/50',
    score: 74,
    description: 'Security awareness, training & access control',
  },
  {
    id: 'data',
    name: 'Data',
    icon: BarChart3,
    className: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-success text-white',
    bgHover: 'ring-success/50',
    score: 95,
    description: 'Encryption at rest and in transit, DLP',
  },
  {
    id: 'networks',
    name: 'Networks',
    icon: Wifi,
    className: 'right-[4%] sm:right-[6%] top-1/2 -translate-y-1/2 bg-sky text-white',
    bgHover: 'ring-sky/50',
    score: 82,
    description: 'Zero Trust segmentation & perimeter defense',
  },
  {
    id: 'automation',
    name: 'Automation & Orchestration',
    icon: Settings2,
    className: 'bottom-[18%] left-1/2 -translate-x-1/2 bg-success text-white',
    bgHover: 'ring-success/50',
    score: 86,
    description: 'Automated threat response & playbooks',
  },
  {
    id: 'devices',
    name: 'Devices',
    icon: Server,
    className: 'bottom-[4%] left-1/2 -translate-x-1/2 bg-danger text-white',
    bgHover: 'ring-danger/50',
    score: 68,
    description: 'Endpoint compliance & device vulnerability',
  },
]

export default function SevenPillars() {
  const [activePillar, setActivePillar] = useState<Pillar | null>(null)

  return (
    <div className="rounded-xl sm:rounded-2xl border border-gray-light bg-white-pure p-4 shadow-[0_2px_12px_rgba(15,41,64,0.06)]">

      <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-square mx-auto flex items-center justify-center p-3 select-none">
        {/* Outer Pulse/Radar Ring */}
        <div className="absolute inset-2 sm:inset-3 rounded-full border-[10px] sm:border-[12px] border-success/60 transition-all duration-700 hover:border-success/80 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />

        {/* Inner Concentric Ring */}
        <div className="absolute inset-9 sm:inset-11 rounded-full border-[10px] sm:border-[12px] border-success/60 z-10 transition-transform duration-500" />

        {/* Venn Circles Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Top Circle */}
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[40%] aspect-square rounded-full bg-success/35 transition-all duration-300" />

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-success/30 transition-all duration-300" />

          {/* Left Circle */}
          <div className="absolute left-[12%] top-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-slate-400/40 transition-all duration-300" />

          {/* Right Circle */}
          <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-sky/45 transition-all duration-300" />

          {/* Bottom Circle */}
          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[40%] aspect-square rounded-full bg-danger/50 transition-all duration-300" />
        </div>

        {/* Pillar Pills */}
        {pillars.map((pillar) => {
          const Icon = pillar.icon
          const isHovered = activePillar?.id === pillar.id

          return (
            <button
              key={pillar.id}
              type="button"
              onMouseEnter={() => setActivePillar(pillar)}
              onMouseLeave={() => setActivePillar(null)}
              onClick={() => setActivePillar(activePillar?.id === pillar.id ? null : pillar)}
              className={`absolute z-20 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[7.5px] sm:text-[8.5px] font-medium shadow-sm transition-all duration-300 cursor-pointer ${
                pillar.className
              } ${
                isHovered
                  ? `scale-110 z-30 shadow-md ring-2 ring-white ${pillar.bgHover}`
                  : 'hover:scale-105'
              }`}
            >
              <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
              <span>{pillar.name}</span>
            </button>
          )
        })}

        {/* Interactive Tooltip on hover/touch */}
        {activePillar && (
          <div className="absolute bottom-0 translate-y-[calc(100%+8px)] z-40 rounded-xl bg-navy/95 backdrop-blur-xs px-3 py-1.5 text-center text-white shadow-xl transition-all animate-in fade-in zoom-in-90 duration-200 pointer-events-none">
            <p className="text-[10px] font-bold text-white flex items-center justify-center gap-1">
              <span>{activePillar.name}</span>
              <span className="text-emerald-400 font-mono">({activePillar.score}%)</span>
            </p>
            <p className="text-[8px] text-white/70 max-w-[200px] leading-tight">
              {activePillar.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}