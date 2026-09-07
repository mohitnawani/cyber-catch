import { Bot, UserRound, LayoutDashboard, FileText } from 'lucide-react'
import { NavLink } from 'react-router'
import cross from '../../assets/cross.png'

const steps = [
  { label: 'Campaigns', to: '/cyber-phisher/campaigns', icon: Bot },
  { label: 'Users', to: '/cyber-phisher/users', icon: UserRound },
  { label: 'Templates', to: '/cyber-phisher/templates', icon: LayoutDashboard },
  { label: 'Landing Pages', to: '/cyber-phisher/landing-pages', icon: FileText },
]

export default function CyberFisherbar() {
  return (
    <aside className="-my-3 w-[178px] shrink-0 bg-white-pure px-4 py-12 shadow-[2px_0_12px_rgba(15,41,64,0.04)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-full text-[#604BFF]">
        <img src={cross} alt="CyberCatch" className="h-10 w-auto border-accent" />
      </div>
      <h1 className="mt-3 text-[15px] font-bold leading-[1.05] text-navy">Welcome to<br />Cyber Phisher!</h1>
      <nav className="mt-6 space-y-4">
        {steps.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-2 rounded-sm px-2 py-2 text-xs font-medium transition ${isActive ? 'bg-[#5E81F41A] text-[#604BFF]' : 'text-navy/60 hover:bg-[#F6F7F9]'}`}
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
