import { CalendarDays, TableProperties, Box, X } from 'lucide-react'
import { NavLink } from 'react-router'
import tick from '../../assets/Tick.png'

const steps = [
  { label: 'Schedule', to: '/cyber-check/schedule', icon: CalendarDays },
  { label: 'Framework', to: '/cyber-check/framework', icon: TableProperties },
  { label: 'Agent', to: '/cyber-check/agent', icon: Box },
]

type CyberCheckbarProps = {
  onClose?: () => void
}

export default function CyberCheckbar({ onClose }: CyberCheckbarProps) {
  return (
    <aside className="w-full h-full lg:w-[190px] shrink-0 bg-white-pure p-5 lg:px-4 lg:py-12 rounded-2xl lg:rounded-none shadow-[0_2px_12px_rgba(15,41,64,0.04)] lg:shadow-[2px_0_12px_rgba(15,41,64,0.04)] flex flex-col justify-start sticky ">
      <div className="flex items-center justify-between lg:block">
        <div className="flex items-center gap-3 lg:block">
          <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full text-[#604BFF]">
            <img src={tick} alt="Cyber Check" className="h-8 lg:h-10 w-auto border-accent" />
          </div>
          <h1 className="text-sm lg:text-[15px] font-bold leading-tight lg:leading-[1.05] text-navy lg:mt-3">
            Welcome to<span className="hidden lg:inline"><br /></span> Cyber Check!
          </h1>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-navy/40 hover:text-navy p-1 rounded-md transition"
            aria-label="Close steps menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="mt-5 lg:mt-6 flex flex-col space-y-2 lg:space-y-4">
        {steps.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => onClose?.()}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg lg:rounded-sm px-3 lg:px-2 py-2.5 lg:py-2 text-xs font-medium transition ${
                isActive ? 'bg-[#5E81F41A] text-[#604BFF]' : 'text-navy/60 hover:bg-[#F6F7F9]'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
