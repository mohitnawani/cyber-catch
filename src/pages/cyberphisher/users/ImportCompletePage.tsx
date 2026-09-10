import { Check } from "lucide-react";

export default function ImportCompletePage() {
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
<div
  className="
    mt-2 flex min-h-[64px] flex-col items-center justify-center rounded-md
    border-2 border-transparent
    [border-image:repeating-linear-gradient(90deg,#87e6b2_0_8px,transparent_8px_18px)_1]
    bg-[#ecfff3] px-3 py-2 text-center
  "
>
  <Check className="mb-1 text-[#16ad63]" size={16} />

  <h3 className="text-[11px] font-bold text-[#19a45b]">
    RECORDS SUCCESSFULLY IMPORTED!
  </h3>

  <p className="mt-0.5 max-w-[630px] text-[10px] leading-4 text-[#2cac69]">
    Members have been sent over the login information to the Email Address
    of file. These members will be able to login the platform and use the
    application.
  </p>
</div>
    </section>
  );
}
