import { MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

type Template = {
  id: number;
  name: string;
  description: string;
  message: string;
  linkTitle: string;
  linkHref: string;
};

type TemplateForm = Omit<Template, "id">;

const initialTemplates: Template[] = [
  {
    id: 1,
    name: "Template 1",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 2,
    name: "Phishing Attack 1",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 3,
    name: "Template Phishing 9/5/2021",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 4,
    name: "SASB-20",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 5,
    name: "Custom-500TCB",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 6,
    name: "TCFP-21",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 7,
    name: "TCFP-20",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 8,
    name: "SASB-21",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 9,
    name: "Custom-finance",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
  {
    id: 10,
    name: "Custom-software",
    description: "",
    message: "",
    linkTitle: "",
    linkHref: "",
  },
];

const emptyForm: TemplateForm = {
  name: "",
  description: "",
  message: "",
  linkTitle: "",
  linkHref: "",
};

const buttonClass =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function Templates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [form, setForm] = useState<TemplateForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shownTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(query.toLowerCase()),
  );

  const updateForm = (key: keyof TemplateForm, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setIsModalOpen(true);
  };

  const openEdit = (template: Template) => {
    const { id: _, ...templateForm } = template;
    setEditingId(template.id);
    setForm(templateForm);
    setOpenMenu(null);
    setIsModalOpen(true);
  };

  const saveTemplate = () => {
    const nextTemplate = {
      ...form,
      name: form.name.trim() || "Untitled template",
    };
    setTemplates((current) =>
      editingId === null
        ? [...current, { id: Date.now(), ...nextTemplate }]
        : current.map((template) =>
            template.id === editingId
              ? { id: editingId, ...nextTemplate }
              : template,
          ),
    );
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(false);
  };

  return (
    <section className="max-w-230 pt-1">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-bold tracking-[-0.03em] text-black">
            Email Templates
          </h2>
          <p className="mt-2 text-xs leading-5 text-navy/75">
            In this section you can manage your email templates.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`${buttonClass} border border-brand bg-white text-brand`}
          >
            View Template Library
          </button>
          <button
            onClick={openCreate}
            className={`${buttonClass} bg-brand text-white`}
          >
            Create Template
          </button>
        </div>
      </div>

      <div className="mt-5 flex h-8 w-41.25 items-center rounded-full bg-[#eff1ff] px-3 text-[10px] text-[#8b8daf]">
        <span className="mr-2">⌕</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search templates"
          className="w-full bg-transparent outline-none placeholder:text-[#8b8daf]"
        />
      </div>

      <div className="mt-4 space-y-2">
        {shownTemplates.map((template) => (
          <div
            key={template.id}
            className="relative flex min-h-11 items-center justify-between rounded-xl bg-white px-4 py-3 text-[10px] text-navy shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
          >
            <span className="font-bold">{template.name}</span>
            <button
              title={`Actions for ${template.name}`}
              onClick={() =>
                setOpenMenu((current) =>
                  current === template.id ? null : template.id,
                )
              }
              className="text-[#8586a3] hover:text-brand"
            >
              <MoreHorizontal size={17} />
            </button>
            {openMenu === template.id && (
              <div className="absolute right-3 top-9 z-10 w-28 rounded-md border border-[#e6e7f0] bg-white p-1 text-[10px] shadow-[0_10px_24px_rgba(15,41,64,0.14)]">
                <button
                  onClick={() => openEdit(template)}
                  className="block w-full rounded px-2 py-2 text-left hover:bg-[#f5f6ff]"
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    setTemplates((current) =>
                      current.filter((item) => item.id !== template.id),
                    );
                    setOpenMenu(null);
                  }}
                  className="block w-full rounded px-2 py-2 text-left text-[#d04e4e] hover:bg-[#fff2f2]"
                >
                  Archive
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {!shownTemplates.length && (
        <p className="mt-4 rounded-xl bg-white p-6 text-center text-xs text-navy/55">
          No templates found.
        </p>
      )}
      {isModalOpen && (
        <TemplateModal
          editing={editingId !== null}
          form={form}
          onChange={updateForm}
          onClose={() => {
            setEditingId(null);
            setForm(emptyForm);
            setIsModalOpen(false);
          }}
          onSave={saveTemplate}
        />
      )}
    </section>
  );
}

function TemplateModal({
  editing,
  form,
  onChange,
  onClose,
  onSave,
}: {
  editing: boolean;
  form: TemplateForm;
  onChange: (key: keyof TemplateForm, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="relative w-full max-w-90 rounded-sm bg-white p-7 shadow-[0_18px_45px_rgba(15,41,64,0.2)]">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#9899bc] hover:text-navy"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <h2 className="text-xl font-bold text-black">
          {editing ? "Change email template" : "Create email template"}
        </h2>
        <p className="mt-2 text-[10px] text-navy/70">
          You can create an email template from scratch here.
        </p>
        <div className="mt-5 space-y-3">
          <Field
            label="Name"
            value={form.name}
            onChange={(value) => onChange("name", value)}
          />
          <Field
            label="Description"
            value={form.description}
            onChange={(value) => onChange("description", value)}
          />
          <label className="block text-[10px] font-bold text-navy">
            Message
            <textarea
              value={form.message}
              onChange={(event) => onChange("message", event.target.value)}
              className="mt-1 block h-20 w-full resize-none rounded border border-[#e5e6ef] p-2 text-[10px] font-normal outline-none focus:border-brand"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Link Title"
              value={form.linkTitle}
              onChange={(value) => onChange("linkTitle", value)}
            />
            <Field
              label="Link HREF"
              value={form.linkHref}
              onChange={(value) => onChange("linkHref", value)}
            />
          </div>
        </div>
        <div className="mt-7 flex gap-3">
          <button
            onClick={onSave}
            className={`${buttonClass} min-w-22.5 bg-brand text-white`}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-2 text-[10px] font-semibold text-[#8586a3]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-[10px] font-bold text-navy">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Input"
        className="mt-1 block h-8 w-full rounded border border-[#e5e6ef] px-2 text-[10px] font-normal outline-none focus:border-brand"
      />
    </label>
  );
}
