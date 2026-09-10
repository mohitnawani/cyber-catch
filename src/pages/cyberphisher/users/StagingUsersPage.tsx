import { Check } from "lucide-react";
import { buttonClass, members } from "./constants";

type Props = {
  selected: number[];
  onToggleMember: (id: number) => void;
  onToggleAll: () => void;
  onPurge: () => void;
  onImport: () => void;
};

export default function StagingUsersPage({
  selected,
  onToggleMember,
  onToggleAll,
  onPurge,
  onImport,
}: Props) {
  const allSelected = selected.length === members.length;
  return (
    <section className="max-w-[920px] pt-6 mx-auto">
      <h2 className="text-[24px] font-bold tracking-[-0.03em] text-black">
        User Records - Staging Area
      </h2>
      <p className="mt-1 text-sm leading-6 text-navy/80">
        These are the members you recently imported with your Excel. User
        <br className="hidden sm:block" /> Accounts are not yet created for
        these members.
      </p>
      <div className="mt-2 rounded-md border border-dashed border-[#f3c36e] bg-[#fff4dc] px-3 py-2 text-center">
        <h3 className="text-[11px] font-bold text-[#d48625]">
          WARNING! RECORDS ARE NOT IMPORTED YET! ACTION NEEDED!
        </h3>
        <p className="mx-auto mt-1 max-w-[610px] text-[11px] leading-5 text-[#d9913c]">
          These Records are in the staging area for your review purposes only.
          Once you are done reviewing this, you can click on the “Import
          Selected Records” to import the users.
        </p>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <button
          onClick={onToggleAll}
          className={`${buttonClass} bg-brand text-white`}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
        <button
          onClick={onImport}
          disabled={!selected.length}
          className={`${buttonClass} bg-brand text-white disabled:cursor-not-allowed disabled:opacity-45`}
        >
          Import Selected Records
        </button>
        <button
          onClick={onPurge}
          disabled={!selected.length}
          className={`${buttonClass} bg-[#d90808] text-white hover:bg-[#b90606] disabled:cursor-not-allowed disabled:opacity-45`}
        >
          Purge Selected Users
        </button>
      </div>
      <div className="mt-2 overflow-x-auto">
        <div className="min-w-[690px]">
          <div className="grid grid-cols-[34px_1.2fr_1.7fr_1.25fr_.65fr] px-3 pb-1 text-[11px] font-semibold text-[#8586a3]">
            <span></span>
            <span>User</span>
            <span>Email</span>
            <span>Department</span>
            <span>Role</span>
          </div>
          <div className="space-y-1">
            {members.map((member) => {
              const checked = selected.includes(member.id);
              return (
                <button
                  type="button"
                  onClick={() => onToggleMember(member.id)}
                  key={member.id}
                  className="grid w-full grid-cols-[34px_1.2fr_1.7fr_1.25fr_.65fr] items-center rounded-xl bg-white px-3 py-1.5 text-left text-[11px] text-navy/80 shadow-[0_4px_14px_rgba(15,41,64,0.05)] hover:bg-[#fafaff]"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${checked ? "border-brand bg-brand text-white" : "border-[#bcc1dc] bg-white"}`}
                  >
                    {checked && <Check size={11} strokeWidth={4} />}
                  </span>
                  <span>{member.name}</span>
                  <span>{member.email}</span>
                  <span>{member.department}</span>
                  <span>{member.role}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-[#999cb9]">
        <span>Records per Page 5 of 25</span>
        <span>
          First &nbsp;|&nbsp; <b className="text-brand">1</b> &nbsp;|&nbsp; 2
          &nbsp;|&nbsp; 3 &nbsp;|&nbsp; 4 &nbsp;|&nbsp; Last
        </span>
      </div>
    </section>
  );
}
