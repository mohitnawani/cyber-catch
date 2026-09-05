import { Outlet, NavLink } from 'react-router'
import { User } from 'lucide-react'

import cyber_catch from '../assets/cyber_catch.png'
import cross from '../assets/cross.png'
import tick from '../assets/Tick.png'
import Rectangle from '../assets/Rectangle.png'
import Phisher from '../assets/Phisher.png'

const nav = [
  { label: 'Dashboard', icon: Rectangle, to: '/' },
  { label: 'Cyber Check', icon: tick, to: '/cyber-check' },
  { label: 'Cyber X-Ray', icon: cross, to: '/cyber-xray' },
  { label: 'Cyber Phisher', icon: Phisher, to: '/cyber-phisher' },
]

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-navy flex">
      <aside className="fixed left-0 top-0 h-full w-[68px] lg:w-[200px] bg-white-pure border-r-[3px] border-brand/60 flex flex-col z-20">
        <div className="h-[56px] flex items-center gap-2 px-3 border-b border-gray-light/80">
          <div className="w-6 h-6 rounded-full border border-gray-light flex items-center justify-center shrink-0" />
          <img src={cyber_catch} alt="cyber" />
        </div>

        <nav className="flex-1 py-6 px-2 space-y-5">
          {nav.map((i) => (
            <NavLink
              key={i.label}
              to={i.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 text-[11px] transition ${
                  isActive ? 'text-brand' : 'text-navy/40 hover:text-navy/70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                      isActive ? 'border-brand/20 bg-brand/5' : 'border-transparent bg-transparent'
                    }`}
                  >
                    <img src={i.icon} alt={i.label} className="w-[18px] h-[18px] object-contain" />
                  </span>
                  <span className="hidden lg:block leading-none">{i.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 flex justify-center lg:justify-start">
          <img src="https://i.pravatar.cc/100?img=15" alt="user" className="w-8 h-8 rounded-full border-2 border-white shadow" />
        </div>
      </aside>

      <div className="flex-1 ml-[68px] lg:ml-[200px]">
        <div className="hidden lg:flex h-8 items-center justify-end px-6 gap-2 text-xs text-navy/50">
          <span>Flow 2</span>
          <span className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">A</span>
          <img src="https://i.pravatar.cc/100?img=15" className="w-6 h-6 rounded-full" alt="a" />
        </div>

        <header className="h-12 bg-white-pure border-b border-gray-light flex items-center px-4 justify-between sticky top-0 z-10 lg:hidden">
          <span className="font-semibold text-navy text-sm">CyberCatch</span>
          <User size={18} className="text-navy" />
        </header>

        <main className="p-3 lg:p-4 bg-[#F6F7F9] min-h-[calc(100vh-32px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}