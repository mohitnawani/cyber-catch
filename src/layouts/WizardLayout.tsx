import { Outlet } from "react-router";
export default function WizardLayout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex gap-8">
          <aside className="w-48">
            <div className="text-sm opacity-60">Steps</div>
          </aside>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}