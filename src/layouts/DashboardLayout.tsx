import { Outlet} from 'react-router'
import { User } from 'lucide-react'

import Sidebar from '../components/ui/Sidebar'




export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-navy flex">
      <Sidebar />

      <div className="flex-1 ml-[107px]">


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
