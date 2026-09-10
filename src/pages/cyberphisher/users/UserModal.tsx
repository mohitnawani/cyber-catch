import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { buttonClass } from './constants'

type Props = { title: string; children: ReactNode; confirmText: string; onConfirm: () => void; onClose: () => void; compact?: boolean }

export default function UserModal({ title, children, confirmText, onConfirm, onClose, compact = false }: Props) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-3"><div className={`relative max-h-[90vh] w-full overflow-y-auto ${compact ? 'max-w-[360px]' : 'max-w-[520px]'} rounded-xl bg-white p-3 sm:p-4 shadow-[0_18px_45px_rgba(15,41,64,0.2)]`}><button onClick={onClose} className="absolute right-3 top-3 text-[#9899bc] hover:text-navy"><X size={14} /></button><h2 className="pr-6 text-base sm:text-lg font-bold text-black">{title}</h2>{children}<div className="mt-2 flex flex-wrap gap-1.5"><button onClick={onConfirm} className={`${buttonClass} min-w-[90px] bg-brand text-white`}>{confirmText}</button><button onClick={onClose} className="px-2 text-xs font-semibold text-[#8586a3]">Cancel</button></div></div></div>
}
