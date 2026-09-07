import { NavLink } from "react-router"

import cyber_catch from "../../assets/cyber_catch.png"
import cross from "../../assets/cross.png"
import tick from "../../assets/Tick.png"
import Rectangle from "../../assets/Rectangle.png"
import Phisher from "../../assets/Phisher.png"
import dp from "../../assets/dp.png"
import { Building2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type NavItem =
  | { label: string; icon: string; to: string; isLucideIcon?: false }
  | { label: string; icon: LucideIcon; to: string; isLucideIcon: true }

const nav: NavItem[] = [
  { label: "Dashboard", icon: Rectangle, to: "/" },
  { label: "Cyber Check", icon: tick, to: "/cyber-check" },
  { label: "Cyber X-Ray", icon: cross, to: "/cyber-xray" },
  { label: "Cyber Phisher", icon: Phisher, to: "/cyber-phisher" },
  { label: "Organization", icon: Building2, to: "/organization", isLucideIcon: true },
]

export default function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 z-20 h-full w-[107px] bg-white-pure flex flex-col">

      {/* Logo */}
      <div className="h-[82px] flex items-center justify-center border-b border-gray-light/80 bg-white-pure">
        <div className="h-[58px] w-[52px] overflow-hidden lg:w-[184px]" aria-label="CyberCatch">
          <img
            src={cyber_catch}
            alt="CyberCatch"
            className="h-auto w-[107px] max-w-none -translate-x-[14px] lg:translate-x-0"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-center px-2 space-y-5">

        {nav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1.5 text-[11px] transition ${
                isActive
                  ? "text-brand"
                  : "text-navy/40 hover:text-navy/70"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`h-[90px] w-[90px] rounded-[15px] flex items-center justify-center ${
                    isActive ? "bg-[#5E81F41A]" : "bg-transparent"
                  }`}
                >
                  {item.isLucideIcon ? (
                    <item.icon size={34} strokeWidth={1.8} aria-label={item.label} />
                  ) : (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-[33.6px] w-[33.6px] rounded-[3px] border-2 object-contain"
                    />
                  )}
                </span>

                <span className="hidden lg:block leading-none">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}

      </div>

      {/* User */}
      <div className="p-3 flex justify-center">
        <div className="relative">
          <img
            src={dp}
            alt="user"
            className="w-15 h-15 rounded-full border-2 border-white shadow"
          />
          <span
            className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
            aria-label="Online"
          />
        </div>
      </div>

    </nav>
  )
}
