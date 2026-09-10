import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { buttonClass } from "./constants";
import type { ImportedMember } from "./types";

type Props = {
  groupName: string;
  members: ImportedMember[];
  onBack: () => void;
  onAddMembers: () => void;
  onRemove: (id: number) => void;
};

export default function GroupDetailsPage({
  groupName,
  members,
  onBack,
  onAddMembers,
  onRemove,
}: Props) {
  return (
    <section className=" pt-1">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-semibold text-brand"
          >
            <ChevronLeft size={15} /> User Groups
          </button>
          <h2 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-black">
            {groupName}
          </h2>
          <p className="mt-2 text-xs leading-5 text-navy/75">
            In this section you can view and manage the users associated with
            this group.
          </p>
        </div>
        <button
          onClick={onAddMembers}
          className={`${buttonClass} bg-brand text-white`}
        >
          <Plus size={14} className="mr-1" />
          Add Users
        </button>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-[34px_1.2fr_1.7fr_.4fr] px-3 pb-2 text-[10px] font-semibold text-[#8586a3]">
          <span></span>
          <span>Name</span>
          <span>Email</span>
          <span></span>
        </div>
        <div className="space-y-2">
          {members.length ? (
            members.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[34px_1.2fr_1.7fr_.4fr] items-center rounded-xl bg-white px-3 py-3 text-[11px] shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
              >
                <span className="h-4 w-4 rounded-[3px] border border-[#bcc1dc]" />
                <span className="font-bold text-navy">{member.name}</span>
                <span>{member.email}</span>
                <button
                  title={`Remove ${member.name}`}
                  onClick={() => onRemove(member.id)}
                  className="text-[#e93535]"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          ) : (
            <p className="rounded-xl bg-white p-6 text-center text-xs text-navy/55">
              No users in this group.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
