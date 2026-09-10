import { useState } from 'react'
import { Search } from 'lucide-react'
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
type Modal = 'add' | 'edit' | 'archive' | 'restore' | 'group-add' | 'group-edit' | 'group-archive' | 'add-members' | 'remove' | null
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
  const [groups, setGroups] = useState(['Leadership', 'Engineering', 'Marketing', 'Finance', 'Operations', 'Human Resources'])
  const [groupName, setGroupName] = useState('Group Name')
  const [groupMembers, setGroupMembers] = useState<ImportedMember[]>(members)
  const [targetMember, setTargetMember] = useState<ImportedMember | null>(null)
  const openAdd = () => { setForm(blankForm); setTargetUser(null); setModal('add') }
  const openEdit = (user: ImportedMember) => { setTargetUser(user); setForm({ name: user.name, email: user.email, department: user.department, role: user.role }); setModal('edit') }
  const updateForm = (key: keyof Form, value: string) => setForm(current => ({ ...current, [key]: value }))
  const saveUser = () => { const user: ImportedMember = { id: targetUser?.id ?? Date.now(), name: form.name.trim() || 'New User', email: form.email.trim() || 'new.user@company.com', department: form.department.trim() || 'General', role: form.role.trim() || 'Member' }; setActiveUsers(current => targetUser ? current.map(item => item.id === targetUser.id ? user : item) : [...current, user]); setModal(null) }
  const archiveUser = () => { if (!targetUser) return; setActiveUsers(current => current.filter(user => user.id !== targetUser.id)); setArchivedUsers(current => [...current, targetUser]); setTargetUser(null); setModal(null) }
  const restoreUser = () => { if (!targetUser) return; setArchivedUsers(current => current.filter(user => user.id !== targetUser.id)); setActiveUsers(current => [...current, targetUser]); setTargetUser(null); setModal(null) }
  const toggleMember = (id: number) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const toggleAll = () => setSelected(current => current.length === members.length ? [] : members.map(member => member.id))
  const openGroup = (name: string) => { setGroupName(name); setPage('group-details') }
  const openGroupEdit = (name: string) => { setGroupName(name); setForm({ ...blankForm, name }); setModal('group-edit') }
  const saveGroup = () => { const name = form.name.trim() || 'New Group'; setGroups(current => current.includes(groupName) ? current.map(group => group === groupName ? name : group) : [...current, name]); setGroupName(name); setModal(null) }
  const archiveGroup = () => { setGroups(current => current.filter(group => group !== groupName)); setModal(null); setPage('groups') }
  const addMembers = (ids: number[]) => { setGroupMembers(current => [...current, ...members.filter(member => ids.includes(member.id) && !current.some(item => item.id === member.id))]); setModal(null) }
  const removeMember = (id: number) => { const user = groupMembers.find(member => member.id === id) ?? null; setTargetMember(user); setModal('remove') }
  const confirmRemoveMember = () => { if (targetMember) setGroupMembers(current => current.filter(member => member.id !== targetMember.id)); setTargetMember(null); setModal(null) }
  let content: React.ReactNode
  if (page === 'users') content = <UserManagementPage users={activeUsers} archived={false} onImport={() => setPage('start')} onAdd={openAdd} onGroups={() => setPage('groups')} onArchiveList={() => setPage('archived')} onActiveList={() => setPage('users')} onArchive={id => { const user = activeUsers.find(item => item.id === id) ?? null; setTargetUser(user); setModal('archive') }} onRestore={() => {}} onEdit={openEdit} />
  else if (page === 'archived') content = <UserManagementPage users={archivedUsers} archived onImport={() => setPage('start')} onAdd={openAdd} onGroups={() => setPage('groups')} onArchiveList={() => setPage('archived')} onActiveList={() => setPage('users')} onArchive={() => {}} onRestore={id => { const user = archivedUsers.find(item => item.id === id) ?? null; setTargetUser(user); setModal('restore') }} onEdit={openEdit} />
  else if (page === 'groups') content = <GroupsPage groups={groups} onBack={() => setPage('users')} onAdd={() => { setGroupName(''); setForm(blankForm); setModal('group-add') }} onManage={openGroup} onArchive={name => { setGroupName(name); setModal('group-archive') }} onEdit={openGroupEdit} />
  else if (page === 'group-details') content = <GroupDetailsPage groupName={groupName} members={groupMembers} onBack={() => setPage('groups')} onAddMembers={() => setModal('add-members')} onRemove={removeMember} />
  else if (page === 'start') content = <ImportUsersPage onImport={() => setPage('upload')} />
  else if (page === 'upload') content = <UploadUsersPage fileName={fileName} onFileSelected={setFileName} onCancel={() => setPage('users')} onImport={() => setPage('staging')} />
  else if (page === 'complete') content = <ImportCompletePage />
  else content = <StagingUsersPage selected={selected} onToggleMember={toggleMember} onToggleAll={toggleAll} onPurge={() => setSelected([])} onImport={() => { setActiveUsers(current => [...current, ...members.filter(user => selected.includes(user.id) && !current.some(item => item.email === user.email))]); setPage('complete') }} />
  return <>{content}{modal && <FlowModal type={modal} form={form} onChange={updateForm} onClose={() => setModal(null)} onSave={saveUser} onArchive={modal === 'group-archive' ? archiveGroup : archiveUser} onRestore={restoreUser} onSaveGroup={saveGroup} onAddMembers={addMembers} onRemoveMember={confirmRemoveMember} />}</>
}

function FlowModal({ type, form, onChange, onClose, onSave, onArchive, onRestore, onSaveGroup, onAddMembers, onRemoveMember }: { type: Exclude<Modal, null>; form: Form; onChange: (key: keyof Form, value: string) => void; onClose: () => void; onSave: () => void; onArchive: () => void; onRestore: () => void; onSaveGroup: () => void; onAddMembers: (ids: number[]) => void; onRemoveMember: () => void }) {
  if (type === 'group-archive') return <UserModal title="Archive Group" confirmText="Yes" onClose={onClose} onConfirm={onArchive} compact><p className="mt-2 text-xs text-navy/75">Are you sure you want to archive this group?</p></UserModal>
  if (type === 'archive' || type === 'restore' || type === 'remove') { const action = type === 'restore' ? 'Restore' : type === 'remove' ? 'Remove' : 'Archive'; return <UserModal title={`${action} User`} confirmText="Yes" onClose={onClose} onConfirm={type === 'archive' ? onArchive : type === 'restore' ? onRestore : onRemoveMember} compact><p className="mt-2 text-xs text-navy/75">Are you sure you want to {action.toLowerCase()} this user?</p></UserModal> }
  if (type === 'add-members') return <AddMembersModal onClose={onClose} onAddMembers={onAddMembers} />
  if (type === 'group-add' || type === 'group-edit') return <UserModal title={type === 'group-add' ? 'Add Group' : 'Update Group'} confirmText={type === 'group-add' ? 'Submit' : 'Update'} onClose={onClose} onConfirm={onSaveGroup}><p className="mt-1 text-xs text-navy/75">Enter the data for the group you want to add to the system.</p><div className="mt-2 grid grid-cols-2 gap-1.5"><TextInput label="Name" value={form.name} onChange={value => onChange('name', value)} /><TextInput label="Risk Level (Optional)" value={form.role} onChange={value => onChange('role', value)} /></div><label className="mt-2 block text-[10px] font-bold text-navy">Description<textarea value={form.department} onChange={event => onChange('department', event.target.value)} className="mt-0.5 block h-14 w-full resize-none rounded border border-[#e5e6ef] p-1.5 text-[10px] font-normal outline-none focus:border-brand" /></label></UserModal>
  const editing = type === 'edit'
  return <UserModal title={editing ? 'Update User' : 'Add New Members'} confirmText={editing ? 'Update' : 'Save'} onClose={onClose} onConfirm={onSave} compact><p className="mt-1 text-xs text-navy/75">{editing ? 'Change the user details below.' : 'Enter the information for the new user.'}</p><div className="mt-2 grid grid-cols-2 gap-1.5"><TextInput label="Name" value={form.name} onChange={value => onChange('name', value)} /><TextInput label="Email address" value={form.email} onChange={value => onChange('email', value)} /><TextInput label="Department" value={form.department} onChange={value => onChange('department', value)} /><TextInput label="Role" value={form.role} onChange={value => onChange('role', value)} /></div></UserModal>
}

function AddMembersModal({ onClose, onAddMembers }: { onClose: () => void; onAddMembers: (ids: number[]) => void }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const toggle = (id: number) => setSelectedIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  return <UserModal title="Add Users" confirmText="Save & Close" onClose={onClose} onConfirm={() => onAddMembers(selectedIds)} compact><p className="mt-1 text-xs text-navy/75">Add one or more users to this group by selecting them from the list.</p><div className="mt-2 flex h-6 items-center rounded-full bg-[#eff1ff] px-1.5 text-[10px] text-[#8b8daf]"><Search size={12} className="mr-2" />Input</div><div className="mt-2 max-h-48 space-y-1 overflow-y-auto">{members.map(member => <label key={member.id} className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#fafafa] p-1.5 text-[10px] shadow-[0_4px_12px_rgba(15,41,64,0.04)]"><input type="checkbox" checked={selectedIds.includes(member.id)} onChange={() => toggle(member.id)} className="accent-brand" /><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1d1bd]">{member.name[0]}</span><span><b className="block">{member.name}</b>{member.email}</span></label>)}</div></UserModal>
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block text-[10px] font-bold text-navy">{label}<input value={value} onChange={event => onChange(event.target.value)} placeholder="Input" className="mt-0.5 block h-6 w-full rounded border border-[#e5e6ef] px-1.5 text-[10px] font-normal outline-none focus:border-brand" /></label> }
