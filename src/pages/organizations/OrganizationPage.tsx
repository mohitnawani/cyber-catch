import { Plus, SquarePen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import EditOrganizationModal from "./EditOrganizationModal";
import OrganizationModal, {
  emptyOrganizationForm,
  type OrganizationForm,
} from "./OrganizationModal";

type Organization = { id: number; name: string; industry: string };
const initialOrganizations: Organization[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: index + 1,
    name: "Some Organization",
    industry: "Industry area name",
  }),
);
const buttonClass =
  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-[13px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function OrganizationPage() {
  // Stores the organizations displayed in the listing.
  const [organizations, setOrganizations] = useState(initialOrganizations);
  // Controls whether the add organization modal is visible.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Tracks the selected (highlighted) row like Figma blue border.
  const [selectedId, setSelectedId] = useState<number | null>(7);
  // Tracks which organization action menu is open.
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  // Current pagination page.
  const [page, setPage] = useState(1);
  // Stores the controlled values entered in the edit form.
  const [form, setForm] = useState<OrganizationForm>(emptyOrganizationForm);
  // Tracks whether the edit organization flow is visible.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const shownOrganizations = organizations;
  const updateForm = <K extends keyof OrganizationForm>(
    key: K,
    value: OrganizationForm[K],
  ) => setForm((current) => ({ ...current, [key]: value }));
  const toggleProduct = (product: string) =>
    setForm((current) => ({
      ...current,
      products: current.products.includes(product)
        ? current.products.filter((item) => item !== product)
        : [...current.products, product],
    }));
  const closeModal = () => {
    setIsModalOpen(false);
    setForm(emptyOrganizationForm);
  };
  const saveOrganization = (name: string, industry: string) => {
    setOrganizations((current) => [
      ...current,
      { id: Date.now(), name, industry },
    ]);
    closeModal();
  };
  const openEditModal = (organization: Organization) => {
    setForm({
      ...emptyOrganizationForm,
      name: organization.name,
      industry: organization.industry,
    });
    setOpenMenu(null);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setForm(emptyOrganizationForm);
  };
  const saveEditedOrganization = () => {
    setOrganizations((current) =>
      current.map((organization) =>
        organization.name === form.name
          ? { ...organization, industry: form.industry }
          : organization,
      ),
    );
    closeEditModal();
  };

  return (
    <section className="max-w-1366 lg:p-[50px] mx-auto overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[27px] font-bold tracking-[-0.03em] text-black">
            Organizations
          </h1>
          <p className="mt-1 text-xs sm:text-[13px] leading-5 text-navy/75">
            Manage the organizations connected to your account.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`${buttonClass} shrink-0 bg-brand text-white`}
        >
          Create an Organization
        </button>
      </div>
      {organizations.length ? (
        <>
          <div className="mt-2 overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[1.4fr_1.4fr_0.4fr] px-3 pb-1 text-[10px] font-semibold text-[#8586a3]">
                <span>Name</span>
                <span>Industry</span>
                <span className="text-right">Manage</span>
              </div>
              <div className="space-y-1">
                {shownOrganizations.map((organization) => {
                  const selected = selectedId === organization.id;
                  return (
                    <div
                      key={organization.id}
                      onClick={() => setSelectedId(organization.id)}
                      className={`relative grid cursor-pointer grid-cols-[1.4fr_1.4fr_0.4fr] items-center rounded-xl bg-white px-3 py-1.5 text-xs text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.05)] transition ${selected ? "ring-2 ring-brand" : "hover:ring-1 hover:ring-brand/40"
                        }`}
                    >
                      <span className="truncate">{organization.name}</span>
                      <span className="truncate">{organization.industry}</span>
                      <span className="flex justify-end">
                        <button
                          title="Manage organization"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu((current) =>
                              current === organization.id ? null : organization.id,
                            );
                          }}
                          className="text-navy/60 hover:text-brand"
                        >
                          <SquarePen size={15} />
                        </button>
                      </span>
                      {openMenu === organization.id && (
                        <div className="absolute right-3 top-8 z-10 w-40 rounded-md border border-[#e6e7f0] bg-white p-1 text-xs shadow-[0_10px_24px_rgba(15,41,64,0.14)]">
                          <button
                            onClick={() => openEditModal(organization)}
                            className="block w-full rounded px-2 py-1 text-left hover:bg-[#f5f6ff]"
                          >
                            Change Details
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              navigate(`/organization/${organization.id}`);
                            }}
                            className="block w-full rounded px-2 py-1 text-left hover:bg-[#f5f6ff]"
                          >
                            Manage Organization
                          </button>
                          <button
                            onClick={() => setOpenMenu(null)}
                            className="block w-full rounded px-2 py-1 text-left hover:bg-[#f5f6ff]"
                          >
                            Add Child Organization
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-end gap-1 text-[10px] text-[#8586a3]">
            <button onClick={() => setPage(1)} className="hover:text-brand">First</button>
            <span className="mx-1">|</span>
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={page === p ? "font-bold text-brand" : "hover:text-brand"}
              >
                {p}
              </button>
            ))}
            <span className="mx-1">|</span>
            <button className="hover:text-brand">Last</button>
          </div>
        </>
      ) : (
        <div className="mt-2 flex flex-col gap-2 rounded-xl border border-gray-light bg-white px-3 py-2 text-xs shadow-[0_4px_14px_rgba(15,41,64,0.05)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-bold text-black">
              There are no organizations yet
            </p>
            <p className="mt-0.5 text-[10px] text-navy/60">
              You can create new organization here.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`${buttonClass} shrink-0 bg-brand text-white`}
          >
            <Plus size={12} className="mr-1" />
            Create an Organization
          </button>
        </div>
      )}
      {isModalOpen && (
        <OrganizationModal
          form={form}
          onChange={updateForm}
          onToggleProduct={toggleProduct}
          onClose={closeModal}
          onSave={() => saveOrganization(form.name.trim() || "Some Organization", form.industry.trim() || "Industry area name")}
        />
      )}
      {isEditModalOpen && (
        <EditOrganizationModal
          form={form}
          onChange={updateForm}
          onToggleProduct={toggleProduct}
          onClose={closeEditModal}
          onSave={saveEditedOrganization}
        />
      )}
    </section>
  );
}