import { Outlet } from 'react-router'
import CyberFisherbar  from '../components/ui/Cyberfisherbar'

export default function CyberFisherLayout() {
  return (
    <div className="flex min-h-[calc(100vh-32px)] gap-8 mx-auto overflow-hidden">
      <CyberFisherbar />
      <main className="min-w-0 flex-1 py-5 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
