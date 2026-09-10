import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type Campaign = {
  id: number;
  name: string;
  status: "Active" | "Draft" | "Archived";
  startDate: string;
  endDate: string;
};

const initialCampaigns: Campaign[] = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  name: "Campaign name",
  status: "Active",
  startDate: "23/08/2021",
  endDate: "27/08/2021",
}));

const buttonClass =
  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function Campaigns() {
  const navigate = useNavigate();
  // Stores campaigns displayed in the campaign list.
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  // Tracks which campaign row action menu is open.
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
<section className="w-full max-w-[920px] pt-1 overflow-x-hidden">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-[20px] font-bold tracking-[-0.03em] text-black">
            Phishing Campaigns
          </h2>
          <p className="mt-1 text-xs leading-4 text-navy/75">
            In this section you can manage your phishing campaigns.
          </p>
        </div>
        <button
          onClick={() => navigate("/cyber-phisher/campaigns/create")}
          className={`${buttonClass} shrink-0 bg-brand text-white`}
        >
          <Plus size={12} className="mr-1" />
          Create Campaign
        </button>
      </div>

      <div className="mt-3 overflow-x-auto pb-1">
        <div className="min-w-[560px]">
          <div className="mx-auto grid grid-cols-[1.6fr_.8fr_1fr_1fr_.25fr] px-3 pb-1.5 text-[10px] font-semibold text-[#8586a3]">
            <span>Name</span>
            <span>Status</span>
            <span>Start Date</span>
            <span>End Date</span>
            <span></span>
          </div>
          <div className="space-y-1.5">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="relative grid min-h-[38px] grid-cols-[1.6fr_.8fr_1fr_1fr_.25fr] items-center rounded-xl bg-white px-3 py-2 text-[10px] text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
              >
                <span className="truncate">{campaign.name}</span>
                <span
                  className={`w-fit rounded-full px-2.5 py-0.5 font-semibold ${campaign.status === "Active" ? "bg-[#c5f8dd] text-[#12a35d]" : "bg-[#eff1ff] text-brand"}`}
                >
                  {campaign.status}
                </span>
                <span>{campaign.startDate}</span>
                <span>{campaign.endDate}</span>
                <button
                  title="Campaign actions"
                  onClick={() =>
                    setOpenMenu((current) =>
                      current === campaign.id ? null : campaign.id,
                    )
                  }
                  className="text-[#8586a3] hover:text-brand"
                >
                  <MoreHorizontal size={15} />
                </button>
            {openMenu === campaign.id && (
              <div className="absolute right-3 top-8 z-10 w-28 rounded-md border border-[#e6e7f0] bg-white p-1 text-[10px] shadow-[0_10px_24px_rgba(15,41,64,0.14)]">
                <button
                  onClick={() => setOpenMenu(null)}
                  className="block w-full rounded px-2 py-1.5 text-left hover:bg-[#f5f6ff]"
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    setCampaigns((current) =>
                      current.filter((item) => item.id !== campaign.id),
                    );
                    setOpenMenu(null);
                  }}
                  className="block w-full rounded px-2 py-1.5 text-left text-[#d04e4e] hover:bg-[#fff2f2]"
                >
                  Archive
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
