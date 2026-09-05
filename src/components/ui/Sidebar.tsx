type SidebarNavItem = {
  label: string
  iconSvg: string
  href?: string
  active?: boolean
}

type SidebarProps = {
  currentPage: 'dashboard' | 'cyber-check' | 'cyber-xray' | 'cyber-phisher' | 'organizations'
  onNavItemClick?: (page: string) => void
}

export default function Sidebar({ currentPage = 'dashboard', onNavItemClick }: SidebarProps) {
  const navItems: SidebarNavItem[] = [
    { label: 'Dashboard', iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M3 12l2-5h14l2 5V12L3 12z"/></svg>', href: '/', active: currentPage === 'dashboard' },
    { label: 'Cyber Check', iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14l2-2l4.5 4.5"/></svg>', href: '/cyber-check', active: currentPage === 'cyber-check' },
    { label: 'Cyber X-Ray', iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17 3a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zm4 6V7a1 1 0 0 1 2 0v5h2a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0v-5h-2a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zm-8 0V7a1 1 0 0 1 2 0v6H4a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0z"/></svg>', href: '/cyber-xray', active: currentPage === 'cyber-xray' },
    { label: 'Cyber Phisher', iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="3" y2="21"/></svg>', href: '/cyber-phisher', active: currentPage === 'cyber-phisher' },
    { label: 'Organizations', iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="3" y2="21"/></svg>', href: '/organizations', active: currentPage === 'organizations' },
  ]

  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-14 flex items-center justify-center px-6 text-xl font-bold text-indigo-600">
        CyberCatch
      </div>
      <div className="flex flex-col items-center gap-2 pt-2 pb-6 text-[11px]">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href || '#'}
            className={`
              flex flex-col items-center gap-1.5 text-sm transition
              ${item.active ? 'text-indigo-700 font-bold' : 'text-navy/60 hover:text-navy'}
              ${item.active ? 'bg-indigo-50' : 'bg-transparent'}
            `}
            onClick={() => {
              if (onNavItemClick) {
                onNavItemClick(item.label)
              }
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: item.iconSvg }} className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </a>
        ))}
        <div className="mt-auto">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">
            You
          </div>
        </div>
      </div>
    </nav>
  )
}