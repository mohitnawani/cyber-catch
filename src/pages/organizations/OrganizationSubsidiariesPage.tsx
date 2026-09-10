import { SquarePen } from "lucide-react";

type Props = { children: string[]; onManage: (name: string) => void };

const buttonClass =
  "inline-flex items-center justify-center rounded-md px-6 py-2 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function OrganizationSubsidiariesPage({
  children,
  onManage,
}: Props) {
  return (
    <section className="mt-3">
      <div className="overflow-x-auto">
        <div className="min-w-[520px]">
          <div className="grid grid-cols-[1.2fr_1.5fr_.5fr] px-4 pb-2 text-[10px] font-semibold text-[#8586a3] mx-auto">
            <span>Name</span>
            <span>Industry</span>
            <span className="text-right">Manage</span>
          </div>
          <div className="space-y-1.5">
            {children.map((child, index) => (
              <div
                key={`${child}-${index}`}
                className="grid min-h-[40px] grid-cols-[1.2fr_1.5fr_.5fr] items-center rounded-xl bg-white px-4 py-2.5 text-[10px] text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
              >
                <span className="truncate">{child}</span>
                <span className="truncate">Industry area name</span>
                <span className="flex justify-end">
                  <button
                    title={`Manage ${child}`}
                    onClick={() => onManage(child)}
                    className="text-navy/60 hover:text-brand"
                  >
                    <SquarePen size={15} />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className={`${buttonClass} min-w-[160px] bg-brand text-white`}>
          Save
        </button>
      </div>
    </section>
  );
}
