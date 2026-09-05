import { NavLink } from "react-router"

import cyber_catch from "../../assets/cyber_catch.png"
import cross from "../../assets/cross.png"
import tick from "../../assets/Tick.png"
import Rectangle from "../../assets/Rectangle.png"
import Phisher from "../../assets/Phisher.png"
import dp from "../../assets/dp.png"


const nav = [
  { label: "Dashboard", icon: Rectangle, to: "/" },
  { label: "Cyber Check", icon: tick, to: "/cyber-check" },
  { label: "Cyber X-Ray", icon: cross, to: "/cyber-xray" },
  { label: "Cyber Phisher", icon: Phisher, to: "/cyber-phisher" },
]

export default function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 h-full w-[68px] lg:w-[200px] bg-white-pure  flex flex-col justify-center z-20">

      {/* Logo */}
      <div className="h-[56px] flex items-center gap-2 px-3 border-b border-gray-light/80">
        <div className="w-6 h-6 rounded-full border border-gray-light flex items-center justify-center shrink-0" />

        <img src={cyber_catch} alt="cyber" />
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-2 space-y-5">

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
                  className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    isActive
                      ? "border-brand/20 bg-brand/5"
                      : "border-transparent bg-transparent"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-[18px] h-[18px] object-contain"
                  />
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
      <div className="p-3 flex justify-center lg:justify-start">
        <img
          src={dp}
          alt="user"
          className="w-15 h-15 rounded-full border-2 border-white shadow"
        />
      </div>

    </nav>
  )
}
