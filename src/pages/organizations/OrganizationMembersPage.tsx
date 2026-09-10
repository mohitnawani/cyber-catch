import { ChevronDown, MoreHorizontal, Plus, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";

const products = ["Cyber Check 24/7", "Cyber X-Ray", "Cyber Phisher"];
const roles = ["Admin", "Manager", "Member"];
const buttonClass =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

type Member = {
  id: number;
  name: string;
  email: string;
  products: string[];
  status: "Active" | "Inactive";
  dateAdded: string;
};
type MemberForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  assignments: Record<string, string>;
};
const initialMembers: Member[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: "Edwards Ralph",
  email: "someuser@fakemail.com",
  products: ["Products"],
  status: "Active",
  dateAdded: "8/7/2021",
}));
const emptyForm: MemberForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  assignments: {},
};
type Modal =
  | "chooser"
  | "add"
  | "invite"
  | "assignments"
  | "organizations"
  | null;

export default function OrganizationMembersPage({
  openSignal = 0,
  onOpened,
}: {
  openSignal?: number;
  onOpened?: () => void;
}) {
  const [members, setMembers] = useState(initialMembers);
  const [modal, setModal] = useState<Modal>(null);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [selectedOrganizations, setSelectedOrganizations] = useState<number[]>(
    [],
  );
  const [checked, setChecked] = useState<number[]>([]);

  const updateForm = <K extends keyof MemberForm>(
    key: K,
    value: MemberForm[K],
  ) => setForm((current) => ({ ...current, [key]: value }));
  const updateAssignment = (product: string, role: string) =>
    updateForm("assignments", { ...form.assignments, [product]: role });
  const openChooser = () => {
    setForm(emptyForm);
    setInviteSent(false);
    setInviteStatus("idle");
    setModal("chooser");
  };
  // Opens the chooser when the parent "Add Members" button is clicked.
  useEffect(() => {
    if (openSignal > 0) {
      openChooser();
      onOpened?.();
    }
  }, [openSignal]);
  const addMemberFromForm = () => {
    const name = `${form.firstName} ${form.lastName}`.trim() || "New Member";
    setMembers((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        email: form.email || "member@example.com",
        products: ["Products"],
        status: "Active",
        dateAdded: "8/7/2021",
      },
    ]);
  };
  const saveMember = (invite: boolean) => {
    addMemberFromForm();
    if (invite) setInviteSent(true);
    else setModal(null);
  };
  // Validates the Invite Member form (Image 4). "Save & Add More" keeps the
  // modal open and shows the success message; "Save & Close" closes it.
  const submitInvite = (closeAfter: boolean) => {
    const valid =
      form.firstName.trim() !== "" &&
      form.lastName.trim() !== "" &&
      form.email.trim().includes("@");
    if (!valid) {
      setInviteStatus("error");
      return;
    }
    addMemberFromForm();
    if (closeAfter) {
      setModal(null);
    } else {
      setInviteStatus("success");
      setForm((current) => ({ ...emptyForm, assignments: current.assignments }));
    }
  };
  const openAssignments = () => {
    setOpenMenu(null);
    setModal("assignments");
  };
  const toggleOrganization = (id: number) =>
    setSelectedOrganizations((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const toggleChecked = (id: number) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  return (
    <section className="mt-3">
      <div className="mt-2 overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[32px_1.2fr_1.7fr_1fr_.8fr_1fr_.3fr] px-3 pb-1.5 text-[10px] font-semibold text-[#8586a3]">
            <span>
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded accent-brand"
              />
            </span>
            <span>Name</span>
            <span>Email</span>
            <span>Products</span>
            <span>Status</span>
            <span>Date added</span>
            <span className="text-right">•••</span>
          </div>
          <div className="space-y-1">
            {members.map((member) => (
              <div
                key={member.id}
                className="relative grid grid-cols-[32px_1.2fr_1.7fr_1fr_.8fr_1fr_.3fr] items-center rounded-xl bg-white px-3 py-1.5 text-[10px] text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
              >
                <span>
                  <input
                    type="checkbox"
                    checked={checked.includes(member.id)}
                    onChange={() => toggleChecked(member.id)}
                    className="h-3.5 w-3.5 rounded accent-brand"
                  />
                </span>
                <span className="truncate font-bold text-navy">
                  {member.name}
                </span>
                <span className="truncate">{member.email}</span>
                <span className="truncate">{member.products.join(", ")}</span>
                <span className="w-fit rounded-full bg-[#c5f8dd] px-3 py-0.5 font-semibold text-[#12a35d]">
                  {member.status}
                </span>
                <span>{member.dateAdded}</span>
                <span className="flex justify-end">
                  <button
                    title="Member actions"
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === member.id ? null : member.id,
                      )
                    }
                    className="text-[#8586a3] hover:text-brand"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </span>
                {openMenu === member.id && (
                  <div className="absolute right-3 top-8 z-10 w-36 rounded-md border border-[#e6e7f0] bg-white p-1 text-[10px] shadow-[0_10px_24px_rgba(15,41,64,0.14)]">
                    <button
                      onClick={openAssignments}
                      className="block w-full rounded px-2 py-1 text-left hover:bg-[#f5f6ff]"
                    >
                      View Assignments
                    </button>
                    <button
                      onClick={() => setOpenMenu(null)}
                      className="block w-full rounded px-2 py-1 text-left hover:bg-[#f5f6ff]"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => setOpenMenu(null)}
                      className="block w-full rounded px-2 py-1 text-left text-[#d04e4e] hover:bg-[#fff2f2]"
                    >
                      Deactivate
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button className={`${buttonClass} min-w-[160px] bg-brand text-white`}>
          Save
        </button>
      </div>
      {modal && (
        <MemberModal
          type={modal}
          form={form}
          inviteSent={inviteSent}
          inviteStatus={inviteStatus}
          selectedOrganizations={selectedOrganizations}
          onChange={updateForm}
          onAssignment={updateAssignment}
          onSubmitInvite={submitInvite}
          onToggleOrganization={toggleOrganization}
          onClose={() => setModal(null)}
          onOpenAdd={() => setModal("add")}
          onOpenInvite={() => {
            setInviteStatus("idle");
            setModal("invite");
          }}
          onOpenOrganizations={() => setModal("organizations")}
          onSave={() => saveMember(false)}
          onInvite={() => saveMember(true)}
        />
      )}
    </section>
  );
}

function MemberModal({
  type,
  form,
  inviteSent,
  inviteStatus,
  selectedOrganizations,
  onChange,
  onAssignment,
  onSubmitInvite,
  onToggleOrganization,
  onClose,
  onOpenAdd,
  onOpenInvite,
  onOpenOrganizations,
  onSave,
  onInvite,
}: {
  type: Exclude<Modal, null>;
  form: MemberForm;
  inviteSent: boolean;
  inviteStatus: "idle" | "success" | "error";
  selectedOrganizations: number[];
  onChange: <K extends keyof MemberForm>(key: K, value: MemberForm[K]) => void;
  onAssignment: (product: string, role: string) => void;
  onSubmitInvite: (closeAfter: boolean) => void;
  onToggleOrganization: (id: number) => void;
  onClose: () => void;
  onOpenAdd: () => void;
  onOpenInvite: () => void;
  onOpenOrganizations: () => void;
  onSave: () => void;
  onInvite: () => void;
}) {
  if (type === "assignments")
    return (
      <AssignmentsModal
        onClose={onClose}
        onOpenOrganizations={onOpenOrganizations}
        form={form}
        onAssignment={onAssignment}
      />
    );
  if (type === "organizations")
    return (
      <OrganizationAssignmentModal
        selectedOrganizations={selectedOrganizations}
        onToggle={onToggleOrganization}
        onClose={onClose}
      />
    );
  if (type === "chooser")
    return (
      <BaseModal
        title="Add New Members"
        onClose={onClose}
        className="min-h-[440px]"
      >
        <p className="mt-2 text-xs leading-5 text-navy/75">
          You can send email invites to members, or add them directly using the
          options below.
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <button
            onClick={onOpenAdd}
            className={`${buttonClass} bg-brand text-white`}
          >
            Add Existing Members
          </button>
          <button
            onClick={onOpenInvite}
            className={`${buttonClass} border border-brand bg-white text-brand`}
          >
            Invite New Members
          </button>
        </div>
      </BaseModal>
    );
  if (type === "invite")
    return (
      <InviteMembersModal
        form={form}
        status={inviteStatus}
        onChange={onChange}
        onAssignment={onAssignment}
        onSaveMore={() => onSubmitInvite(false)}
        onSaveClose={() => onSubmitInvite(true)}
        onClose={onClose}
      />
    );
  return (
    <BaseModal title="Add Organization Member" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        <Field
          label="First Name"
          value={form.firstName}
          onChange={(value) => onChange("firstName", value)}
          required
        />
        <Field
          label="Last Name"
          value={form.lastName}
          onChange={(value) => onChange("lastName", value)}
          required
        />
      </div>
      <Field
        label="Email Address"
        value={form.email}
        onChange={(value) => onChange("email", value)}
        required
      />
      <Field
        label="Password"
        value={form.password}
        onChange={(value) => onChange("password", value)}
        type="password"
        required
      />
      <Field
        label="Confirm password"
        value={form.confirmPassword}
        onChange={(value) => onChange("confirmPassword", value)}
        type="password"
        required
      />
      <p className="mt-2 text-[10px] font-bold text-navy">
        Products Assignments
      </p>
      <p className="mt-0.5 text-[10px] leading-4 text-navy/70">
        Select the products that you&apos;d like this member to have access to.
        <br />
        Once you select a product, select a role.
      </p>
      <ProductAssignments
        assignments={form.assignments}
        onAssignment={onAssignment}
      />
      {inviteSent && (
        <p className="mt-2 text-center text-[10px] font-semibold text-[#12a35d]">
          Success! We have invited your member via email!
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          onClick={onInvite}
          className={`${buttonClass} bg-brand text-white`}
        >
          Save & Add More
        </button>
        <button
          onClick={onSave}
          className={`${buttonClass} border border-brand bg-white text-brand`}
        >
          Save & Close
        </button>
        <button
          onClick={onClose}
          className="px-2 text-[10px] font-semibold text-[#8586a3]"
        >
          Cancel
        </button>
      </div>
    </BaseModal>
  );
}

function AssignmentsModal({
  form,
  onAssignment,
  onOpenOrganizations,
  onClose,
}: {
  form: MemberForm;
  onAssignment: (product: string, role: string) => void;
  onOpenOrganizations: () => void;
  onClose: () => void;
}) {
  return (
    <BaseModal title="Assignments" onClose={onClose}>
      <p className="mt-1.5 text-[10px] text-navy/70">
        You can view and manage the assignments here.
      </p>
      <div className="mt-2 rounded-lg bg-[#fafaff] p-2 text-[10px] py-4">
        <div className="grid grid-cols-[1fr_1fr] px-2 pb-1.5 font-bold text-[#8586a3]">
          <span>Organization</span>
          <span>Industry</span>
        </div>
        <div className="grid grid-cols-[1fr_1fr] items-center rounded bg-white px-2 py-1.5 text-navy shadow-sm">
          <span>Some Organization</span>
          <span>Industry area name</span>
        </div>
        <p className="mt-2 font-bold text-navy">Products &amp; Roles</p>
        {products.map((product) => (
          <div
            key={product}
            className="mt-1.5 grid grid-cols-[1fr_100px] items-center gap-2"
          >
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                defaultChecked
                className="h-3.5 w-3.5 accent-brand"
              />
              {product}
            </label>
            <select
              value={form.assignments[product] || ""}
              onChange={(event) => onAssignment(product, event.target.value)}
              className="h-6 rounded border border-[#e5e6ef] bg-white px-1 text-[10px]"
            >
              <option value="">Role</option>
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={onOpenOrganizations}
          className={`${buttonClass} mt-2 border border-brand bg-white text-brand`}
        >
          <Plus size={12} className="mr-1" />
          Add More
        </button>
      </div>
      <button
        onClick={onClose}
        className={`${buttonClass} mt-2 bg-brand text-white`}
      >
        Save
      </button>
    </BaseModal>
  );
}

function ProductAssignments({
  assignments,
  onAssignment,
}: {
  assignments: Record<string, string>;
  onAssignment: (product: string, role: string) => void;
}) {
  return (
    <div className="mt-1.5 space-y-1">
      <div className="grid grid-cols-[1fr_110px] text-[10px] font-bold text-[#8586a3]">
        <span>Product</span>
        <span>Role</span>
      </div>
      {products.map((product) => (
        <div
          key={product}
          className="grid grid-cols-[1fr_110px] items-center gap-2 text-[10px]"
        >
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              defaultChecked
              className="h-3.5 w-3.5 rounded accent-brand"
            />
            {product}
          </label>
          <div className="relative">
            <select
              value={assignments[product] || ""}
              onChange={(event) => onAssignment(product, event.target.value)}
              className="h-6 w-full appearance-none rounded border border-[#e5e6ef] bg-white px-1.5 pr-6 text-[10px] outline-none"
            >
              <option value="">Role</option>
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-1.5 top-1.5 text-[#9899bc]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function InviteMembersModal({
  form,
  status,
  onChange,
  onAssignment,
  onSaveMore,
  onSaveClose,
  onClose,
}: {
  form: MemberForm;
  status: "idle" | "success" | "error";
  onChange: <K extends keyof MemberForm>(key: K, value: MemberForm[K]) => void;
  onAssignment: (product: string, role: string) => void;
  onSaveMore: () => void;
  onSaveClose: () => void;
  onClose: () => void;
}) {
  return (
    <BaseModal title="Invite Member" onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        <Field
          label="First Name"
          value={form.firstName}
          onChange={(value) => onChange("firstName", value)}
          required
        />
        <Field
          label="Last Name"
          value={form.lastName}
          onChange={(value) => onChange("lastName", value)}
          required
        />
      </div>
      <Field
        label="Email Address"
        value={form.email}
        onChange={(value) => onChange("email", value)}
        required
      />
      <p className="mt-2 text-[10px] font-bold text-navy">
        Products Assignments
      </p>
      <p className="mt-0.5 text-[10px] leading-4 text-navy/70">
        Select the products that you&apos;d like this member to have access to.
        <br />
        Once you select a product, select a role.
      </p>
      <ProductAssignments
        assignments={form.assignments}
        onAssignment={onAssignment}
      />
      {status === "success" && (
        <p className="mt-2 text-center text-[10px] font-semibold text-[#12a35d]">
          Success! We have invited your member via email!
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-center text-[10px] font-semibold text-[#d04e4e]">
          Sorry! We can&apos;t invite your member. Please contact us at
          cybercatch@support.com
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          onClick={onSaveMore}
          className={`${buttonClass} bg-brand text-white`}
        >
          Save & Add More
        </button>
        <button
          onClick={onSaveClose}
          className={`${buttonClass} border border-brand bg-white text-brand`}
        >
          Save & Close
        </button>
        <button
          onClick={onClose}
          className="px-2 text-[10px] font-semibold text-[#8586a3]"
        >
          Cancel
        </button>
      </div>
    </BaseModal>
  );
}

function OrganizationAssignmentModal({
  selectedOrganizations,
  onToggle,
  onClose,
}: {
  selectedOrganizations: number[];
  onToggle: (id: number) => void;
  onClose: () => void;
}) {
  const organizationRows = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    name: "Some Organization",
    industry: "Industry area name",
  }));
  return (
    <BaseModal title="Assignments" onClose={onClose}>
      <p className="mt-1.5 text-[10px] text-navy/70">
        Select organizations to assign this member to.
      </p>
      <div className="mt-2 space-y-1">
        {organizationRows.map((organization) => (
          <label
            key={organization.id}
            className="grid grid-cols-[24px_1fr_1fr] items-center rounded-lg bg-[#fafaff] px-2 py-1.5 text-[10px] text-navy"
          >
            <input
              type="checkbox"
              checked={selectedOrganizations.includes(organization.id)}
              onChange={() => onToggle(organization.id)}
              className="h-3.5 w-3.5 accent-brand"
            />
            <span className="truncate">{organization.name}</span>
            <span className="truncate">{organization.industry}</span>
          </label>
        ))}
      </div>
      <button
        onClick={onClose}
        className={`${buttonClass} mt-2 bg-brand text-white`}
      >
        Assign to Organization
      </button>
    </BaseModal>
  );
}

function BaseModal({
  title,
  children,
  onClose,
  className = "min-h-[220px]",
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div
        className={`relative flex w-full max-w-[440px] flex-col rounded-xl bg-white p-3 shadow-[0_18px_45px_rgba(15,41,64,0.2)] max-h-[90vh] overflow-y-auto ${className}`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 text-[#9899bc] hover:text-navy"
        >
          <X size={15} />
        </button>
        <h2 className="flex items-center gap-1.5 pr-6 text-base font-bold text-black">
          <UserPlus size={14} className="text-brand" />
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="mt-1.5 block text-[10px] font-bold text-navy">
      {label}
      {required && <span className="text-[#e93535]">*</span>}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Input"
        className="mt-1 block h-6 w-full rounded border border-[#e5e6ef] px-1.5 text-[10px] font-normal outline-none focus:border-brand"
      />
    </label>
  );
}