export default function Card({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-zinc-700 bg-zinc-900 p-4 ${className}`}>
      {title && <h3 className="mb-3 text-sm font-semibold opacity-80">{title}</h3>}
      {children}
    </div>
  )
}
