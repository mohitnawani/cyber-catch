import { Outlet } from 'react-router'
import Cyberxraybar from '../components/ui/Cyberxraybar'

export default function CyberXRayLayout() {
  return (
    <div className="flex min-h-[calc(100vh-32px)] gap-8">
      <Cyberxraybar />
      <main className="min-w-0 flex-1 py-5">
        <Outlet />
      </main>
    </div>
  )
}
