import { NavLink } from "react-router"
import cyber_catch from "../../assets/cyber_catch.png"
import cross from "../../assets/cross.png"
import tick from "../../assets/Tick.png"
import Rectangle from "../../assets/Rectangle.png"
import Phisher from "../../assets/Phisher.png"
import dp from "../../assets/dp.png"
import { Building2, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type NavItem =
  | { label: string; icon: string; to: string; isLucideIcon?: false }
  | { label: string; icon: LucideIcon; to: string; isLucideIcon: true }

const nav: NavItem[] = [
  { label: "Dashboard", icon: Rectangle, to: "/" },
  { label: "Cyber Check", icon: tick, to: "/cyber-check" },
  { label: "Cyber X-Ray", icon: cross, to: "/cyber-xray" },
  { label: "Cyber Phisher", icon: Phisher, to: "/cyber-phisher" },
  { label: "Organizations", icon: Building2, to: "/organization", isLucideIcon: true },
]

type SidebarProps = {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <nav className="h-full w-[107px] bg-white-pure flex flex-col justify-between py-4 shadow-[2px_0_12px_rgba(15,41,64,0.03)] border-r border-gray-light/60">

      {/* Logo & Mobile Close */}
      <div className="h-[70px] flex items-center justify-between px-2 lg:justify-center bg-white-pure">
        <div className="h-[48px] w-auto overflow-hidden flex items-center justify-center" aria-label="CyberCatch">
          <img
            src={cyber_catch}
            alt="CyberCatch"
            className="h-auto w-[96px] max-w-none -translate-x-[8px]"
          />
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-navy/40 hover:text-navy p-1 rounded-md transition"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-3 px-2">
        {nav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={() => onClose?.()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-[84px] py-2.5 px-1 rounded-[16px] transition-all text-center gap-1.5 ${
                isActive
                  ? "bg-[#5E81F41A] text-brand font-semibold"
                  : "text-navy/50 hover:text-navy/80 hover:bg-gray-50/70"
              }`
            }
          >
            {item.isLucideIcon ? (
              <item.icon className="w-10 h-10 p-0.5 object-contain" strokeWidth={1.6} aria-label={item.label} />
            ) : (
              <img
                src={item.icon}
                alt={item.label}
                className="w-10 h-10 object-contain"
              />
            )}
            <span className="text-[10px] leading-tight text-center font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>

      {/* User */}
      <div className="p-2 flex justify-center">
        <div className="relative">
          <img
            src={dp}
            alt="user"
            className="w-10 h-10 rounded-full border-2 border-white shadow-xs object-cover"
          />
          <span
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
            aria-label="Online"
          />
        </div>
      </div>

    </nav>
  )
}
