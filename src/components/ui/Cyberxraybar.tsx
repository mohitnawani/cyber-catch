import { CalendarDays, ClipboardCheck, ScanSearch, X } from 'lucide-react'
import { NavLink } from 'react-router'
import cross from '../../assets/cross.png'

const steps = [
  { label: 'Schedule', to: '/cyber-xray/schedule', icon: CalendarDays },
  { label: 'Scan URLs', to: '/cyber-xray/scan-urls', icon: ScanSearch },
  { label: 'Review', to: '/cyber-xray/review', icon: ClipboardCheck },
]

type CyberxraybarProps = {
  onClose?: () => void
}

export default function Cyberxraybar({ onClose }: CyberxraybarProps) {
  return (
    <aside className="w-full h-full lg:w-[188px] shrink-0 bg-white-pure p-3 lg:px-3 lg:py-5 rounded-xl lg:rounded-none shadow-[0_2px_12px_rgba(15,41,64,0.04)] lg:shadow-[2px_0_12px_rgba(15,41,64,0.04)] flex flex-col justify-start">
      <div className="flex items-center justify-between lg:block">
        <div className="flex items-center gap-2.5 lg:block">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#5E81F41A] text-brand">
            <img src={cross} alt="Cyber X-Ray" className="h-6 w-6 object-contain" />
          </div>
          <h1 className="text-[13px] font-bold leading-tight text-navy lg:mt-2">
            Welcome to<span className="hidden lg:inline"><br /></span> Cyber X-Ray!
          </h1>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-navy/40 hover:text-navy p-1 rounded-md transition"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <nav className="mt-3 lg:mt-4 flex flex-col space-y-1">
        {steps.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => onClose?.()}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[12px] leading-5 font-medium transition ${
                isActive ? 'bg-[#5E81F41A] text-brand font-semibold' : 'text-navy/60 hover:bg-[#F6F7F9] hover:text-navy/80'
              }`
            }
          >
            <Icon size={12} strokeWidth={1.4}  className="h-4 w-4 shrink-0 object-contain" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
