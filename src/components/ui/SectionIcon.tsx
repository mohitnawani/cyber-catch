import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  label: string
  size?: number
}

/**
 * Section header icon that matches the left sidebar icon language:
 * - 24px-style glyph (w-5/h-5) in brand color
 * - soft brand tint background (#5E81F41A) + 12px radius
 * - compact 36px box so line rhythm stays tight
 */
export default function SectionIcon({ icon: Icon, label, size = 20 }: Props) {
  return (
    <span
      aria-hidden={!label}
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#5E81F41A] text-brand"
    >
      <Icon size={size} strokeWidth={1.8} className="h-5 w-5 object-contain" />
    </span>
  )
}
