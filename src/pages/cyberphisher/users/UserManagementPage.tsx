import { Archive, MoreHorizontal, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { buttonClass } from './constants'
import type { ImportedMember } from './types'

type Props = {
  users: ImportedMember[]
  archived: boolean
  onImport: () => void
  onAdd: () => void
  onGroups: () => void
  onArchiveList: () => void
  onActiveList: () => void
  onArchive: (id: number) => void
  onRestore: (id: number) => void
  onEdit: (user: ImportedMember) => void
}

export default function UserManagementPage({ users, archived, onImport, onAdd, onGroups, onArchiveList, onActiveList, onArchive, onRestore, onEdit }: Props) {
  const [query, setQuery] = useState('')
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const shownUsers = useMemo(
    () => users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase())),
    [users, query]
  )

  return (
    <section className="mx-auto w-full max-w-[980px] pt-6">
      {/* Header row */}
      <div className="flex  items-start justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-bold tracking-[-0.03em] text-black">
            {archived ? 'Archived Users' : 'Users'}
          </h2>
          <p className="mt-1 text-xs  text-navy/75">
            This section allows you to manage<br />your Organization&apos;s Members
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {archived ? (
            <button onClick={onActiveList} className={`${buttonClass} h-8 bg-brand px-4 text-white`}>
              Active Users
            </button>
          ) : (
            <>
              <button onClick={onImport} className={`${buttonClass} h-8 bg-brand px-4 text-white`}>
                Import Users
              </button>
              <button onClick={onAdd} className={`${buttonClass} h-8 bg-brand px-4 text-white`}>
                Add A User
              </button>
              <button onClick={onArchiveList} className={`${buttonClass} h-8 bg-brand px-4 text-white`}>
                Archived Users
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search + Groups row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#979bc0]">
          <SlidersHorizontal size={13} />
          <div className="flex h-6 w-[165px] items-center rounded-full bg-[#eff1ff] px-2">
            <Search size={11} className="mr-1.5 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Input"
              className="w-full bg-transparent text-[10px] outline-none placeholder:text-[#969bbd]"
            />
          </div>
        </div>
        {!archived && (
          <button onClick={onGroups} className={`${buttonClass} h-8 min-w-[95px] border border-brand bg-white px-4 text-brand`}>
            Groups
          </button>
        )}
      </div>

      {/* Table */}
      <div className="mt-3 overflow-x-auto pb-1">
        <div className="min-w-[730px]">
          <div className="grid grid-cols-5 px-3 pb-1 text-[10px] font-semibold text-[#8586a3]">
            <span>Name</span>
            <span>Groups</span>
            <span>Department</span>
            <span>Role</span>
            <span>Actions</span>
          </div>

          <div className="space-y-1.5">
            {shownUsers.length ? (
              shownUsers.map((user) => (
                <div
                  key={user.id}
                  className="relative grid grid-cols-5 items-center rounded-xl bg-white px-3 py-1.5 text-[10px] text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.06)]"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f1d1bd] text-[9px] font-bold">
                      {user.name.split(' ').map((name) => name[0]).join('')}
                    </span>
                    <span className="min-w-0">
                      <b className="block truncate text-navy">{user.name}</b>
                      <small className="block truncate text-[9px] text-navy/60">{user.email}</small>
                    </span>
                  </div>
                  <span>-</span>
                  <span>{user.department}</span>
                  <span>{user.role}</span>
                  <div>
                    <button
                      title="User actions"
                      onClick={() => setOpenMenuId((id) => (id === user.id ? null : user.id))}
                      className="rounded p-1 text-[#7c83b7] transition hover:bg-[#f2f3ff] hover:text-brand"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-4 top-11 z-10 w-28 rounded-lg border border-[#e6e7f0] bg-white p-1 text-[10px] shadow-[0_10px_24px_rgba(15,41,64,0.14)]">
                        <button
                          onClick={() => { setOpenMenuId(null); archived ? onRestore(user.id) : onEdit(user) }}
                          className="w-full rounded px-2 py-1.5 text-left text-navy hover:bg-[#f5f6ff]"
                        >
                          {archived ? 'Restore' : 'Edit'}
                        </button>
                        {!archived && (
                          <button
                            onClick={() => { setOpenMenuId(null); onArchive(user.id) }}
                            className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-[#d04e4e] hover:bg-[#fff4f4]"
                          >
                            <Archive size={11} />
                            Archive
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-xl bg-white p-6 text-center text-xs text-navy/55">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
