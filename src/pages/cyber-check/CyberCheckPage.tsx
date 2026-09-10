import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Layers, ChevronRight } from 'lucide-react'
import CyberCheckbar from '../../components/ui/CyberCheckbar'
import tick from '../../assets/Tick.png'

export default function CyberCheckPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const currentStep = pathname.includes('framework')
    ? 'Framework'
    : pathname.includes('agent')
    ? 'Agent'
    : 'Schedule'

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-32px)] gap-3 lg:gap-5 max-w-[1440px] mx-auto overflow-hidden">
      {/* Mobile/Tablet Steps Header with Toggle Button */}
      <div className="flex lg:hidden items-center justify-between gap-2 rounded-xl border border-gray-light bg-white px-3 py-2 shadow-xs">
        <div className="flex min-w-0 items-center gap-2">
          <img src={tick} alt="Cyber Check" className="h-5 w-5 shrink-0 object-contain" />
          <div className="flex min-w-0 items-center gap-1 text-[11px]">
            <span className="truncate font-semibold text-navy/50">Cyber Check</span>
            <ChevronRight size={12} className="shrink-0 text-navy/30" />
            <span className="truncate font-bold text-brand">{currentStep}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-brand/20 bg-blue-50/80 px-2.5 py-1 text-[11px] font-semibold text-brand transition hover:bg-blue-100"
        >
          <Layers size={13} />
          <span>Switch Step</span>
        </button>
      </div>

      {/* Mobile/Tablet Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile/Tablet Drawer Container */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[240px] max-w-[85vw] bg-white transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <CyberCheckbar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Desktop Permanent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <CyberCheckbar />
      </div>

      {/* Main Content */}
      <main className="min-w-0 flex-1 py-2 lg:py-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}
