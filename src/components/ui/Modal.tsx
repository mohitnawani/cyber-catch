export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-xl p-6 w-[420px] border border-zinc-700">
        {children}
        <button onClick={onClose} className="mt-4 text-sm opacity-70">Close</button>
      </div>
    </div>
  )
}
