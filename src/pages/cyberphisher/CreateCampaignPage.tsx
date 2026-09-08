import { CalendarDays, ChevronDown, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type CampaignForm = {
  name: string;
  description: string;
  groups: string[];
  landingPage: string;
  startDate: string;
  endDate: string;
  emailTemplate: string;
};

const emptyForm: CampaignForm = {
  name: "",
  description: "",
  groups: ["", ""],
  landingPage: "",
  startDate: "2021-08-23",
  endDate: "2021-08-27",
  emailTemplate: "",
};
const availableGroups = ["Leadership", "Engineering", "Marketing", "Finance"];
const landingPages = [
  "Security Awareness",
  "Account Verification",
  "Password Reset",
];
const emailTemplates = [
  "Template 1",
  "Phishing Attack 1",
  "SASB-20",
  "Custom-finance",
];
const buttonClass =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function CreateCampaignPage() {
  const navigate = useNavigate();
  // Stores the values entered in the create campaign form.
  const [form, setForm] = useState<CampaignForm>(emptyForm);

  const updateForm = <K extends keyof CampaignForm>(
    key: K,
    value: CampaignForm[K],
  ) => setForm((current) => ({ ...current, [key]: value }));
  const updateGroup = (index: number, value: string) =>
    updateForm(
      "groups",
      form.groups.map((group, itemIndex) =>
        itemIndex === index ? value : group,
      ),
    );
  const addGroup = () => updateForm("groups", [...form.groups, ""]);
  const removeGroup = (index: number) =>
    updateForm(
      "groups",
      form.groups.filter((_, itemIndex) => itemIndex !== index),
    );
  const saveCampaign = () => navigate("/cyber-phisher/campaigns");

  return (
    <section className="max-w-230 pb-8 pt-1">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[24px] font-bold tracking-[-0.03em] text-black">
            Create Campaign
          </h2>
          <p className="mt-2 text-xs text-navy/75">
            Please, fill these fields to create new campaign.
          </p>
        </div>
        <button
          onClick={() => navigate("/cyber-phisher/campaigns")}
          aria-label="Close create campaign"
          className="text-[#9899bc] hover:text-navy"
        >
          <X size={18} />
        </button>
      </div>
      <div className="mt-5 max-w-155 space-y-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Name"
            value={form.name}
            onChange={(value) => updateForm("name", value)}
          />
          <Field
            label="Description (Optional)"
            value={form.description}
            onChange={(value) => updateForm("description", value)}
          />
        </div>
        <FormSection title="Please, choose one or more groups to associate as target groups for this campaign.">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {form.groups.map((group, index) => (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between text-[10px] font-bold text-navy">
                  <span>Group {index + 1}</span>
                  {form.groups.length > 2 && (
                    <button
                      onClick={() => removeGroup(index)}
                      aria-label={`Remove group ${index + 1}`}
                      className="text-[#d04e4e]"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
                <SelectField
                  value={group}
                  placeholder="Group name"
                  options={availableGroups}
                  onChange={(value) => updateGroup(index, value)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={addGroup}
            className={`${buttonClass} mt-3 bg-brand text-white`}
          >
            <Plus size={13} className="mr-1" />
            Add Group
          </button>
        </FormSection>
        <FormSection title="Please, add landing page to associate with this campaign">
          <label className="block max-w-60 text-[10px] font-bold text-navy">
            Landing page
            <SelectField
              value={form.landingPage}
              placeholder="Landing name"
              options={landingPages}
              onChange={(value) => updateForm("landingPage", value)}
            />
          </label>
        </FormSection>
        <FormSection title="Please, set the dates for this campaign">
          <div className="grid max-w-75 grid-cols-2 gap-3">
            <DateField
              label="Start Date"
              value={form.startDate}
              onChange={(value) => updateForm("startDate", value)}
            />
            <DateField
              label="End Date"
              value={form.endDate}
              onChange={(value) => updateForm("endDate", value)}
            />
          </div>
        </FormSection>
        <FormSection title="Please, select email template for this campaign">
          <label className="block max-w-60 text-[10px] font-bold text-navy">
            Email template
            <SelectField
              value={form.emailTemplate}
              placeholder="Template name"
              options={emailTemplates}
              onChange={(value) => updateForm("emailTemplate", value)}
            />
          </label>
        </FormSection>
        <div className="flex gap-3">
          <button
            onClick={saveCampaign}
            className={`${buttonClass} bg-brand text-white`}
          >
            Save Campaign
          </button>
          <button
            onClick={() => navigate("/cyber-phisher/campaigns")}
            className="px-2 text-[10px] font-semibold text-[#8586a3]"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-xs text-navy/80">{title}</p>
      {children}
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
function SelectField({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative mt-1">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-full appearance-none rounded border border-[#e5e6ef] bg-white px-2 pr-7 text-[10px] font-normal text-navy outline-none focus:border-brand"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-2 top-2 text-[#9899bc]"
      />
    </div>
  );
}
function DateField({
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
      <div className="relative mt-1">
        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-8 w-full rounded border border-[#e5e6ef] bg-white px-2 pr-7 text-[10px] font-normal text-navy outline-none focus:border-brand"
        />
        <CalendarDays
          size={13}
          className="pointer-events-none absolute right-2 top-2 text-[#9899bc]"
        />
      </div>
    </label>
  );
}
