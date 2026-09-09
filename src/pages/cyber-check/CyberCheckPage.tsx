import { Outlet } from 'react-router'
import CyberCheckbar from '../../components/ui/CyberCheckbar'

export default function CyberCheckPage() {
  return (
    <div className="flex min-h-[calc(100vh-32px)] gap-8">
      <CyberCheckbar />
      <main className="min-w-0 flex-1 py-5">
        <Outlet />
      </main>
    </div>
  )
}

