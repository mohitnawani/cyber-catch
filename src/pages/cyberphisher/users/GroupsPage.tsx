import {
  Archive,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { buttonClass } from "./constants";

type Props = {
  groups: string[];
  onBack: () => void;
  onAdd: () => void;
  onManage: (group: string) => void;
  onArchive: (group: string) => void;
  onEdit: (group: string) => void;
};

export default function GroupsPage({
  groups,
  onBack,
  onAdd,
  onManage,
  onArchive,
  onEdit,
}: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <section className="mx-auto w-full max-w-[920px] pt-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-semibold text-brand"
      >
        <ChevronLeft size={15} /> Users
      </button>
      <h2 className="mt-1 text-[24px] font-bold tracking-[-0.03em] text-black">
        User Groups
      </h2>
      <p className="mt-0.5 text-xs text-navy/70">
        Add one or more members to User Groups. You will be able to assign User
        Groups to campaigns.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex h-8 w-full max-w-[220px] items-center rounded-full bg-[#eff1ff] px-3 text-[11px] text-[#8b8daf]">
          <Search size={12} className="mr-1.5" />
          Input
        </div>
        <button
          onClick={onAdd}
          className={`${buttonClass} bg-brand px-3 text-white`}
        >
          <Plus size={13} className="mr-1" />
          Add New Group
        </button>
      </div>
      <div className="mt-5 overflow-x-auto pb-1">
        <div className="min-w-[720px]">
        <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr_.5fr] px-4 pb-2 text-[10px] font-semibold text-[#8586a3]">
          <span>Group Name</span>
          <span>Total Members</span>
          <span>Risk Level</span>
          <span>Last Updated Date</span>
          <span>Actions</span>
        </div>
        <div className="space-y-2">
          {groups.map((group, index) => (
            <div
              key={group}
              className="relative grid grid-cols-[1.7fr_1fr_1fr_1fr_.5fr] items-center rounded-xl bg-white px-4 py-3 text-[11px] shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
            >
              <button
                onClick={() => onManage(group)}
                className="text-left font-bold text-navy hover:text-brand"
              >
                {group}
              </button>
              <span>11</span>
              <span
                className={`w-fit rounded-full px-2 py-0.5 ${index % 3 === 0 ? "bg-[#ffe0e0] text-[#d04e4e]" : index % 3 === 1 ? "bg-[#fff0dc] text-[#cf8c27]" : "bg-[#fff7d8] text-[#b28b24]"}`}
              >
                {index % 3 === 0 ? "High" : index % 3 === 1 ? "Medium" : "Low"}
              </span>
              <span>7/5/2021</span>
              <button
                title="Group actions"
                onClick={() =>
                  setOpenGroup((current) => (current === group ? null : group))
                }
                className="text-brand"
              >
                <MoreHorizontal size={15} />
              </button>
              {openGroup === group && (
                <div className="absolute right-3 top-10 z-10 w-32 rounded-md border border-[#e6e7f0] bg-white p-1 text-[10px] shadow-[0_10px_24px_rgba(15,41,64,0.14)]">
                  <button
                    onClick={() => {
                      setOpenGroup(null);
                      onManage(group);
                    }}
                    className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-navy hover:bg-[#f5f6ff]"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => {
                      setOpenGroup(null);
                      onArchive(group);
                    }}
                    className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-navy hover:bg-[#f5f6ff]"
                  >
                    <Archive size={12} />
                    Archive
                  </button>
                  <button
                    onClick={() => {
                      setOpenGroup(null);
                      onEdit(group);
                    }}
                    className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-navy hover:bg-[#f5f6ff]"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
