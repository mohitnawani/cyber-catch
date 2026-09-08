import { Building2, MoreHorizontal, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import AddOrganizationModal from './AddOrganizationModal'
import EditOrganizationModal from './EditOrganizationModal'
import { emptyOrganizationForm, type OrganizationForm } from './OrganizationModal'

type Organization = { id: number; name: string; industry: string }
const initialOrganizations: Organization[] = Array.from({ length: 9 }, (_, index) => ({ id: index + 1, name: 'ABC Inc.', industry: 'Industry name' }))
const buttonClass = 'inline-flex h-9 items-center justify-center rounded-md px-4 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30'

export default function OrganizationPage() {
  // Stores the organizations displayed in the listing.
  const [organizations, setOrganizations] = useState(initialOrganizations)
  // Controls whether the add organization modal is visible.
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Filters organizations by name.
  const [query, setQuery] = useState('')
  // Tracks which organization action menu is open.
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  // Stores the controlled values entered in the edit form.
  const [form, setForm] = useState<OrganizationForm>(emptyOrganizationForm)
  // Tracks whether the edit organization flow is visible.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const navigate = useNavigate()
  const shownOrganizations = organizations.filter(organization => organization.name.toLowerCase().includes(query.toLowerCase()))
  const updateForm = <K extends keyof OrganizationForm>(key: K, value: OrganizationForm[K]) => setForm(current => ({ ...current, [key]: value }))
  const toggleProduct = (product: string) => setForm(current => ({ ...current, products: current.products.includes(product) ? current.products.filter(item => item !== product) : [...current.products, product] }))
  const closeModal = () => { setIsModalOpen(false); setForm(emptyOrganizationForm) }
  const saveOrganization = (name: string, industry: string) => { setOrganizations(current => [...current, { id: Date.now(), name, industry }]); closeModal() }
  const openEditModal = (organization: Organization) => { setForm({ ...emptyOrganizationForm, name: organization.name, industry: organization.industry }); setOpenMenu(null); setIsEditModalOpen(true) }
  const closeEditModal = () => { setIsEditModalOpen(false); setForm(emptyOrganizationForm) }
  const saveEditedOrganization = () => { setOrganizations(current => current.map(organization => organization.name === form.name ? { ...organization, industry: form.industry } : organization)); closeEditModal() }

  return <section className="max-w-230 pt-1"><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-[24px] font-bold tracking-[-0.03em] text-black">Organizations</h1><p className="mt-2 text-xs leading-5 text-navy/75">Manage the organizations connected to your account.</p></div><button onClick={() => setIsModalOpen(true)} className={`${buttonClass} bg-brand text-white`}><Plus size={13} className="mr-1" />Create an Organization</button></div>{organizations.length ? <><div className="mt-5 flex justify-end"><div className="flex h-8 w-41.25 items-center rounded-full bg-[#eff1ff] px-3 text-[10px] text-[#8b8daf]"><Search size={12} className="mr-2" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Input" className="w-full bg-transparent outline-none" /></div></div><div className="mt-4 space-y-2">{shownOrganizations.map(organization => <div key={organization.id} className="relative flex min-h-11 items-center justify-between rounded-xl bg-white px-4 py-3 text-[10px] text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.05)]"><span>{organization.name}</span><button title="Organization actions" onClick={() => setOpenMenu(current => current === organization.id ? null : organization.id)} className="text-[#8586a3]"><MoreHorizontal size={17} /></button>{openMenu === organization.id && <div className="absolute right-3 top-9 z-10 w-36 rounded-md border border-[#e6e7f0] bg-white p-1 text-[10px] shadow-[0_10px_24px_rgba(15,41,64,0.14)]"><button onClick={() => openEditModal(organization)} className="block w-full rounded px-2 py-2 text-left hover:bg-[#f5f6ff]">Change Details</button><button onClick={() => { setOpenMenu(null); navigate(`/organization/${organization.id}`) }} className="block w-full rounded px-2 py-2 text-left hover:bg-[#f5f6ff]">Manage Organization</button><button onClick={() => setOpenMenu(null)} className="block w-full rounded px-2 py-2 text-left hover:bg-[#f5f6ff]">Add Child Organization</button></div>}</div>)}</div><div className="mt-4 flex justify-end text-[10px] text-[#8586a3]">First&nbsp; 1&nbsp; | 2&nbsp; | 3&nbsp; | 4&nbsp; | 5&nbsp; | Last</div></> : <div className="mt-5 flex items-center justify-between rounded-md border-2 border-brand bg-white px-4 py-3 text-[10px] shadow-[0_4px_14px_rgba(15,41,64,0.05)]"><div><p className="font-bold text-navy">There are no organizations yet</p><p className="mt-1 text-[9px] text-navy/60">You can create a new organization to get started.</p></div><button onClick={() => setIsModalOpen(true)} className={`${buttonClass} h-8 bg-brand px-3 text-white`}><Plus size={12} className="mr-1" />Create an Organization</button></div>}{!organizations.length && <div className="mt-20 flex flex-col items-center text-navy/35"><Building2 size={34} /><span className="mt-2 text-xs">No organizations</span></div>}{isModalOpen && <AddOrganizationModal onClose={closeModal} onSave={saveOrganization} />}{isEditModalOpen && <EditOrganizationModal form={form} onChange={updateForm} onToggleProduct={toggleProduct} onClose={closeEditModal} onSave={saveEditedOrganization} />}</section>
}
