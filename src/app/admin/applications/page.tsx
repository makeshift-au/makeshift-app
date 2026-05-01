import AdminApplicationsTable from "@/components/AdminApplicationsTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Applications" };

export default function AdminApplicationsPage() {
  return (
    <>
      <div className="font-mono text-xs text-pink tracking-[0.1em] mb-2">
        / ADMIN / APPLICATIONS
      </div>
      <h1 className="font-display font-[800] text-[clamp(32px,6vw,46px)] leading-[0.95] tracking-[-0.02em] mb-3">
        Applications.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Every artist who wants in. Review, approve, or reject with a note.
      </p>
      <AdminApplicationsTable />
    </>
  );
}
