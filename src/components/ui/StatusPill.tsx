export default function StatusPill({ status }: { status: 'Verified' | 'Pending' | 'Active' | 'Archived' }) {
  const map: Record<string, string> = {
    Verified: 'bg-green-600/20 text-green-400',
    Pending: 'bg-yellow-600/20 text-yellow-400',
    Active: 'bg-blue-600/20 text-blue-400',
    Archived: 'bg-zinc-600/20 text-zinc-400'
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs ${map[status]}`}>{status}</span>
}
