import { ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { buttonClass, members } from './constants'

type Props = { onBack: () => void; onAddMembers: () => void; onRemove: () => void }

export default function GroupDetailsPage({ onBack, onAddMembers, onRemove }: Props) {
  return <section className="max-w-[820px] pt-1"><div className="flex items-center justify-between"><div><button onClick={onBack} className="flex items-center gap-1 text-xs font-semibold text-brand"><ChevronLeft size={15} /> User Groups</button><h2 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-black">Group Name</h2><p className="mt-2 text-xs leading-5 text-navy/75">In this section you can manage your group.</p></div><button onClick={onAddMembers} className={`${buttonClass} bg-brand text-white`}><Plus size={14} className="mr-1" />Add Users</button></div><div className="mt-5"><div className="grid grid-cols-[34px_1.2fr_1.7fr_.4fr] px-3 pb-2 text-[10px] font-semibold text-[#8586a3]"><span></span><span>Name</span><span>Email</span><span></span></div><div className="space-y-2">{members.concat(members.slice(0, 2)).map((member, index) => <div key={`${member.id}-${index}`} className="grid grid-cols-[34px_1.2fr_1.7fr_.4fr] items-center rounded-xl bg-white px-3 py-3 text-[11px] shadow-[0_4px_14px_rgba(15,41,64,0.05)]"><span className="h-4 w-4 rounded-[3px] border border-[#bcc1dc]" /><span className="font-bold text-navy">{member.name}</span><span>{member.email}</span><button onClick={onRemove} className="text-[#e93535]"><Trash2 size={15} /></button></div>)}</div></div></section>
}
