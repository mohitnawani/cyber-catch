import { Outlet, NavLink } from 'react-router'
import { LayoutDashboard, ShieldCheck, ScanSearch, Fish, Building2, Menu, User } from 'lucide-react'

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Cyber Check', icon: ShieldCheck, to: '/cyber-check' },
  { label: 'Cyber X-Ray', icon: ScanSearch, to: '/cyber-xray' },
  { label: 'Cyber Phisher', icon: Fish, to: '/cyber-phisher' },
  { label: 'Organizations', icon: Building2, to: '/organizations' },
]

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#061222] text-white flex">
      <aside className="fixed left-0 top-0 h-full w-[72px] lg:w-60 bg-[#0B1E33] border-r border-white/10 flex flex-col z-20">
        <div className="h-14 flex items-center gap-3 px-4 border-b border-white/5">
          <div className="w-7 h-7 rounded bg-brand flex items-center justify-center text-xs font-bold">C</div>
          <span className="hidden lg:block font-semibold text-sm tracking-wide">CyberCatch</span>
          <Menu size={16} className="ml-auto hidden lg:block opacity-60" />
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
          {nav.map(i => (
            <NavLink
              key={i.label}
              to={i.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${isActive ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`
              }
            >
              <i.icon size={18} />
              <span className="hidden lg:block">{i.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <img src="https://i.pravatar.cc/100?img=15" alt="user" className="w-8 h-8 rounded-full border-2 border-success" />
            <div className="hidden lg:block text-xs leading-tight">
              <div className="font-medium">Alex Morgan</div>
              <div className="text-white/50">Admin</div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 ml-[72px] lg:ml-60">
        <header className="h-14 bg-[#0B1E33]/50 backdrop-blur border-b border-white/5 flex items-center px-6 justify-between sticky top-0 z-10 lg:hidden">
          <span className="font-semibold">CyberCatch</span>
          <User size={18} />
        </header>
        <main className="p-4 lg:p-6 bg-[#061222] min-h-[calc(100vh-56px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
