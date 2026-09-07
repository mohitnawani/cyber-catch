import { useState } from 'react'
import { members } from './constants'
import GroupDetailsPage from './GroupDetailsPage'
import GroupsPage from './GroupsPage'
import ImportCompletePage from './ImportCompletePage'
import ImportUsersPage from './ImportUsersPage'
import StagingUsersPage from './StagingUsersPage'
import type { ImportedMember, UserFlowView } from './types'
import UploadUsersPage from './UploadUsersPage'
import UserManagementPage from './UserManagementPage'
import UserModal from './UserModal'

type Page = UserFlowView | 'users' | 'archived' | 'groups' | 'group-details'
type Modal = 'add' | 'edit' | 'archive' | 'restore' | 'group-add' | 'group-edit' | 'add-members' | 'remove' | null
type Form = { name: string; email: string; department: string; role: string }
const blankForm: Form = { name: '', email: '', department: '', role: '' }

export default function Users() {
  const [page, setPage] = useState<Page>('users')
  const [modal, setModal] = useState<Modal>(null)
  const [activeUsers, setActiveUsers] = useState<ImportedMember[]>(members)
  const [archivedUsers, setArchivedUsers] = useState<ImportedMember[]>([])
  const [targetUser, setTargetUser] = useState<ImportedMember | null>(null)
  const [form, setForm] = useState<Form>(blankForm)
  const [fileName, setFileName] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const openAdd = () => { setForm(blankForm); setTargetUser(null); setModal('add') }
  const openEdit = (user: ImportedMember) => { setTargetUser(user); setForm({ name: user.name, email: user.email, department: user.department, role: user.role }); setModal('edit') }
  const updateForm = (key: keyof Form, value: string) => setForm(current => ({ ...current, [key]: value }))
  const saveUser = () => { const user: ImportedMember = { id: targetUser?.id ?? Date.now(), name: form.name.trim() || 'New User', email: form.email.trim() || 'new.user@company.com', department: form.department.trim() || 'General', role: form.role.trim() || 'Member' }; setActiveUsers(current => targetUser ? current.map(item => item.id === targetUser.id ? user : item) : [...current, user]); setModal(null) }
  const archiveUser = () => { if (!targetUser) return; setActiveUsers(current => current.filter(user => user.id !== targetUser.id)); setArchivedUsers(current => [...current, targetUser]); setTargetUser(null); setModal(null) }
  const restoreUser = () => { if (!targetUser) return; setArchivedUsers(current => current.filter(user => user.id !== targetUser.id)); setActiveUsers(current => [...current, targetUser]); setTargetUser(null); setModal(null) }
  const toggleMember = (id: number) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const toggleAll = () => setSelected(current => current.length === members.length ? [] : members.map(member => member.id))
  let content: React.ReactNode
  if (page === 'users') content = <UserManagementPage users={activeUsers} archived={false} onImport={() => setPage('start')} onAdd={openAdd} onGroups={() => setPage('groups')} onArchiveList={() => setPage('archived')} onActiveList={() => setPage('users')} onArchive={id => { const user = activeUsers.find(item => item.id === id) ?? null; setTargetUser(user); setModal('archive') }} onRestore={() => {}} onEdit={openEdit} />
  else if (page === 'archived') content = <UserManagementPage users={archivedUsers} archived onImport={() => setPage('start')} onAdd={openAdd} onGroups={() => setPage('groups')} onArchiveList={() => setPage('archived')} onActiveList={() => setPage('users')} onArchive={() => {}} onRestore={id => { const user = archivedUsers.find(item => item.id === id) ?? null; setTargetUser(user); setModal('restore') }} onEdit={openEdit} />
  else if (page === 'groups') content = <GroupsPage onBack={() => setPage('users')} onAdd={() => setModal('group-add')} onEdit={() => setModal('group-edit')} onOpenGroup={() => setPage('group-details')} />
  else if (page === 'group-details') content = <GroupDetailsPage onBack={() => setPage('groups')} onAddMembers={() => setModal('add-members')} onRemove={() => setModal('remove')} />
  else if (page === 'start') content = <ImportUsersPage onImport={() => setPage('upload')} />
  else if (page === 'upload') content = <UploadUsersPage fileName={fileName} onFileSelected={setFileName} onCancel={() => setPage('users')} onImport={() => setPage('staging')} />
  else if (page === 'complete') content = <ImportCompletePage />
  else content = <StagingUsersPage selected={selected} onToggleMember={toggleMember} onToggleAll={toggleAll} onPurge={() => setSelected([])} onImport={() => { setActiveUsers(current => [...current, ...members.filter(user => selected.includes(user.id) && !current.some(item => item.email === user.email))]); setPage('complete') }} />
  return <>{content}{modal && <FlowModal type={modal} form={form} onChange={updateForm} onClose={() => setModal(null)} onSave={saveUser} onArchive={archiveUser} onRestore={restoreUser} />}</>
}

function FlowModal({ type, form, onChange, onClose, onSave, onArchive, onRestore }: { type: Exclude<Modal, null>; form: Form; onChange: (key: keyof Form, value: string) => void; onClose: () => void; onSave: () => void; onArchive: () => void; onRestore: () => void }) {
  if (type === 'archive' || type === 'restore' || type === 'remove') { const action = type === 'restore' ? 'Restore' : type === 'remove' ? 'Remove' : 'Archive'; return <UserModal title={`${action} User`} confirmText="Yes" onClose={onClose} onConfirm={type === 'archive' ? onArchive : type === 'restore' ? onRestore : onClose} compact><p className="mt-5 text-xs text-navy/75">Are you sure you want to {action.toLowerCase()} this user?</p></UserModal> }
  if (type === 'add-members') return <UserModal title="Add Users" confirmText="Save & Close" onClose={onClose} onConfirm={onClose} compact><p className="mt-3 text-xs text-navy/75">Select users to add them to this group.</p><div className="mt-4 space-y-2">{members.map(member => <label key={member.id} className="flex items-center gap-3 rounded-lg bg-[#fafafa] p-2 text-[10px]"><input type="checkbox" /><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1d1bd]">{member.name[0]}</span><span><b className="block">{member.name}</b>{member.email}</span></label>)}</div></UserModal>
  if (type === 'group-add' || type === 'group-edit') return <UserModal title={type === 'group-add' ? 'Add Group' : 'Update Group'} confirmText={type === 'group-add' ? 'Submit' : 'Update'} onClose={onClose} onConfirm={onClose}><p className="mt-3 text-xs text-navy/75">Group changes are saved for this session.</p><TextInput label="Group name" value={form.name} onChange={value => onChange('name', value)} /><TextInput label="Risk level" value={form.role} onChange={value => onChange('role', value)} /></UserModal>
  const editing = type === 'edit'
  return <UserModal title={editing ? 'Update User' : 'Add New Members'} confirmText={editing ? 'Update' : 'Save'} onClose={onClose} onConfirm={onSave} compact><p className="mt-3 text-xs text-navy/75">{editing ? 'Change the user details below.' : 'Enter the information for the new user.'}</p><div className="mt-5 grid grid-cols-2 gap-3"><TextInput label="Name" value={form.name} onChange={value => onChange('name', value)} /><TextInput label="Email address" value={form.email} onChange={value => onChange('email', value)} /><TextInput label="Department" value={form.department} onChange={value => onChange('department', value)} /><TextInput label="Role" value={form.role} onChange={value => onChange('role', value)} /></div></UserModal>
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block text-[10px] font-bold text-navy">{label}<input value={value} onChange={event => onChange(event.target.value)} placeholder="Input" className="mt-1 block h-8 w-full rounded border border-[#e5e6ef] px-2 text-[10px] font-normal outline-none focus:border-brand" /></label> }
