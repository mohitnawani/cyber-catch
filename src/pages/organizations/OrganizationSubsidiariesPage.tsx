import { ExternalLink } from "lucide-react";

type Props = { children: string[]; onManage: (name: string) => void };

export default function OrganizationSubsidiariesPage({
  children,
  onManage,
}: Props) {
  return (
    <section className="mt-5">
      <div className="grid grid-cols-[1.2fr_1.5fr_.5fr] px-4 pb-2 text-[10px] font-semibold text-[#8586a3] mx-auto">
        <span>Name</span>
        <span>Industry</span>
        <span>Manage</span>
      </div>
      <div className="space-y-2">
        {children.map((child, index) => (
          <div
            key={`${child}-${index}`}
            className="grid min-h-[40px] grid-cols-[1.2fr_1.5fr_.5fr] items-center rounded-xl bg-white px-4 py-3 text-[10px] text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
          >
            <span>{child}</span>
            <span>Industry area name</span>
            <button
              title={`Manage ${child}`}
              onClick={() => onManage(child)}
              className="text-brand hover:text-navy"
            >
              <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <button className="inline-flex h-9 items-center justify-center rounded-md bg-brand px-8 text-[10px] font-bold text-white">
          Save
        </button>
      </div>
    </section>
  );
}
