import { ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import OrganizationActionModal from "./OrganizationActionModal";
import OrganizationGeneralPage from "./OrganizationGeneralPage";
import OrganizationMembersPage from "./OrganizationMembersPage";
import AddChildOrganizationModal from "./AddChildOrganizationModal";
import OrganizationSubsidiariesPage from "./OrganizationSubsidiariesPage";

type Product = { id: number; name: string; active: boolean };
const initialProducts: Product[] = [
  { id: 1, name: "Product name", active: true },
  { id: 2, name: "Product name", active: true },
  { id: 3, name: "Product name", active: true },
  { id: 4, name: "Product name", active: true },
  { id: 5, name: "Product name", active: false },
  { id: 6, name: "Product name", active: false },
];
const buttonClass =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-[10px] font-bold transition focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function OrganizationProductsPage() {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  // Stores the products and their active/inactive state for this organization.
  const [products, setProducts] = useState(initialProducts);
  // Tracks the product waiting for an activate/deactivate confirmation.
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  // Controls which organization detail tab is visible.
  const [activeTab, setActiveTab] = useState<
    "general" | "products" | "members" | "subsidiaries"
  >("general");
  // Stores child organizations created under this organization.
  const [children, setChildren] = useState<string[]>(["ABC Inc. - San Diego"]);
  // Controls whether the add-child flow is visible.
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);

  const confirmToggle = () => {
    if (!pendingProduct) return;
    setProducts((current) =>
      current.map((product) =>
        product.id === pendingProduct.id
          ? { ...product, active: !product.active }
          : product,
      ),
    );
    setPendingProduct(null);
  };

  const organizationTitle =
    organizationId === "1"
      ? "Hyper Trends"
      : `Organization ${organizationId ?? ""}`;
  const saveChildOrganization = (name: string) => {
    setChildren((current) => [...current, name]);
    setIsChildModalOpen(false);
  };
  return (
    <section className="max-w-230 pt-1 mx-auto ">
      <button
        onClick={() => navigate("/organization")}
        className="flex items-center gap-1 text-xs font-semibold text-brand"
      >
        <ChevronLeft size={15} /> Organizations
      </button>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] text-navy/50">
            Organizations / {organizationTitle}
          </p>
          <h1 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-black">
            {organizationTitle}
          </h1>
          <nav className="mt-4 flex gap-5 text-[10px] font-semibold text-navy/60">
            <button
              onClick={() => setActiveTab("general")}
              className={
                activeTab === "general"
                  ? "border-b-2 border-brand pb-2 text-brand"
                  : "pb-2"
              }
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={
                activeTab === "products"
                  ? "border-b-2 border-brand pb-2 text-brand"
                  : "pb-2"
              }
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={
                activeTab === "members"
                  ? "border-b-2 border-brand pb-2 text-brand"
                  : "pb-2"
              }
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab("subsidiaries")}
              className={
                activeTab === "subsidiaries"
                  ? "border-b-2 border-brand pb-2 text-brand"
                  : "pb-2"
              }
            >
              Subsidiaries
            </button>
          </nav>
        </div>
        <div className="flex gap-2">
          {(activeTab === "general" || activeTab === "subsidiaries") && (
            <button
              onClick={() => setIsChildModalOpen(true)}
              className={`${buttonClass} bg-brand text-white`}
            >
              Add Child Organization
            </button>
          )}
          {(activeTab === "general" ||
            activeTab === "subsidiaries" ||
            activeTab === "members") && (
            <button className={`${buttonClass} bg-brand text-white`}>
              Add Members
            </button>
          )}
          {activeTab === "products" && (
            <button className={`${buttonClass} bg-brand text-white`}>
              <Plus size={13} className="mr-1" />
              Add New Product
            </button>
          )}
          {activeTab === "members" && (
            <button className={`${buttonClass} bg-brand text-white`}>
              Add Members
            </button>
          )}
        </div>
      </div>
      {activeTab === "general" && (
        <div className="mt-5">
          <OrganizationGeneralPage />
          <div className="mt-8">
            <h2 className="text-base font-bold text-black">
              Child Organizations
            </h2>
            <div className="mt-3 space-y-2">
              {children.map((child, index) => (
                <div
                  key={`${child}-${index}`}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-[10px] text-navy/75 shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
                >
                  <span>{child}</span>
                  <button className="text-[#8586a3]">•••</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab === "products" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-lg bg-white p-4 shadow-[0_4px_14px_rgba(15,41,64,0.05)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold text-navy">
                  {product.name}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-[9px] font-semibold ${product.active ? "bg-[#c5f8dd] text-[#12a35d]" : "bg-[#eff1ff] text-[#8586a3]"}`}
                >
                  {product.active ? "Active" : "Not Active"}
                </span>
              </div>
              <div className="mt-9 flex items-center justify-between text-[9px] text-navy/60">
                <button className="text-brand">Configure</button>
                <button
                  onClick={() => setPendingProduct(product)}
                  aria-label={`${product.active ? "Deactivate" : "Activate"} ${product.name}`}
                  className={`relative h-5 w-9 rounded-full transition ${product.active ? "bg-brand" : "bg-[#b9bbd0]"}`}
                >
                  <span
                    className={`absolute top-1 h-3 w-3 rounded-full bg-white transition ${product.active ? "right-1" : "left-1"}`}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {activeTab === "members" && <OrganizationMembersPage />}
      {activeTab === "subsidiaries" && (
        <OrganizationSubsidiariesPage
          children={children}
          onManage={() => setActiveTab("general")}
        />
      )}
      {pendingProduct && (
        <OrganizationActionModal
          action={pendingProduct.active ? "deactivate" : "activate"}
          onClose={() => setPendingProduct(null)}
          onConfirm={confirmToggle}
        />
      )}
      {isChildModalOpen && (
        <AddChildOrganizationModal
          parentName={organizationTitle}
          onClose={() => setIsChildModalOpen(false)}
          onSave={saveChildOrganization}
        />
      )}
    </section>
  );
}
