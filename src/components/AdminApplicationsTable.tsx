"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getApplications,
  approveApplication,
  rejectApplication,
  markInReview,
} from "@/app/actions/admin";

type Application = {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  city?: string;
  state?: string;
  bio?: string;
  disciplines: string[];
  work_description?: string;
  price_range?: string;
  lead_time?: string;
  slug_preference?: string;
  instagram?: string;
  website?: string;
  why_makeshift?: string;
  status: string;
  reviewer_notes?: string;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-orange/15 text-orange",
  in_review: "bg-blue/15 text-blue",
  approved: "bg-lime/15 text-lime",
  rejected: "bg-pink/15 text-pink",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminApplicationsTable() {
  const [apps, setApps] = useState<Application[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const loadApps = useCallback(async () => {
    setLoading(true);
    const data = await getApplications(filter);
    setApps(data as Application[]);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  const filteredApps = apps.filter(
    (a) =>
      !search ||
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.city?.toLowerCase().includes(search.toLowerCase()),
  );

  const counts = {
    all: apps.length,
    new: apps.filter((a) => a.status === "new").length,
    in_review: apps.filter((a) => a.status === "in_review").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  async function handleApprove(id: string) {
    setActionLoading(id);
    const result = await approveApplication(id);
    if (result.error) alert(result.error);
    await loadApps();
    setActionLoading(null);
  }

  async function handleReject(id: string) {
    const notes = prompt("Rejection reason (optional):");
    if (notes === null) return; // cancelled
    setActionLoading(id);
    const result = await rejectApplication(id, notes || undefined);
    if (result.error) alert(result.error);
    await loadApps();
    setActionLoading(null);
  }

  async function handleReview(id: string) {
    setActionLoading(id);
    await markInReview(id);
    await loadApps();
    setActionLoading(null);
  }

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            ["all", "All"],
            ["new", "New"],
            ["in_review", "In Review"],
            ["approved", "Approved"],
            ["rejected", "Rejected"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`font-mono text-xs tracking-[0.05em] px-4 py-2 rounded-full transition-colors ${
              filter === key
                ? "bg-lime text-black font-bold"
                : "bg-dark1 border border-dark2 text-lightgrey hover:border-lime hover:text-lime"
            }`}
          >
            {label} · {counts[key]}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-dark1 border border-dark2 rounded-full px-4 py-2 text-sm text-white focus:border-lime focus:outline-none"
          placeholder="Search by name, email, or city..."
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-midgrey font-mono text-sm">
          Loading applications...
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-midgrey font-mono text-sm mb-2">
            No applications found
          </div>
          <p className="text-sm text-midgrey">
            {filter !== "all"
              ? "Try a different filter"
              : "Applications will appear here once artists apply"}
          </p>
        </div>
      ) : (
        <div className="bg-dark1 border border-dark2 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark2">
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">
                  Applicant
                </th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">
                  Discipline
                </th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">
                  Applied
                </th>
                <th className="text-left font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">
                  Status
                </th>
                <th className="text-right font-mono text-[10px] text-midgrey tracking-[0.15em] uppercase p-4 font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((a) => (
                <>
                  <tr
                    key={a.id}
                    className="border-b border-dark2 last:border-b-0 hover:bg-black cursor-pointer"
                    onClick={() =>
                      setExpanded(expanded === a.id ? null : a.id)
                    }
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex-shrink-0 bg-dark2 flex items-center justify-center font-display font-bold text-sm text-midgrey">
                          {a.full_name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-display font-bold">
                            {a.full_name}
                          </div>
                          <div className="font-mono text-[10px] text-midgrey">
                            {a.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {a.disciplines?.join(", ") || "—"}
                    </td>
                    <td className="p-4 font-mono text-xs text-midgrey">
                      {timeAgo(a.created_at)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full ${STATUS_COLORS[a.status] ?? "bg-dark2 text-midgrey"}`}
                      >
                        {a.status.toUpperCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {actionLoading === a.id ? (
                        <span className="font-mono text-xs text-midgrey">
                          ...
                        </span>
                      ) : (
                        <div
                          className="flex gap-2 justify-end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {a.status === "new" && (
                            <button
                              onClick={() => handleReview(a.id)}
                              className="border border-blue text-blue font-mono text-[10px] px-3 py-1 rounded-full tracking-[0.05em]"
                            >
                              REVIEW
                            </button>
                          )}
                          {(a.status === "new" ||
                            a.status === "in_review") && (
                            <>
                              <button
                                onClick={() => handleApprove(a.id)}
                                className="bg-lime text-black font-mono text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.05em]"
                              >
                                APPROVE
                              </button>
                              <button
                                onClick={() => handleReject(a.id)}
                                className="border border-pink text-pink font-mono text-[10px] px-3 py-1 rounded-full tracking-[0.05em]"
                              >
                                REJECT
                              </button>
                            </>
                          )}
                          {a.status === "approved" && (
                            <span className="font-mono text-[10px] text-lime tracking-[0.05em]">
                              ✓ ONBOARDING
                            </span>
                          )}
                          {a.status === "rejected" && (
                            <span className="font-mono text-[10px] text-midgrey tracking-[0.05em]">
                              CLOSED
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                  {/* Expanded detail row */}
                  {expanded === a.id && (
                    <tr key={`${a.id}-detail`} className="border-b border-dark2">
                      <td colSpan={5} className="p-6 bg-black/50">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          {a.phone && (
                            <div>
                              <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                                PHONE
                              </span>
                              {a.phone}
                            </div>
                          )}
                          <div>
                            <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                              LOCATION
                            </span>
                            {[a.city, a.state].filter(Boolean).join(", ") ||
                              "—"}
                          </div>
                          {a.price_range && (
                            <div>
                              <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                                PRICE RANGE
                              </span>
                              {a.price_range}
                            </div>
                          )}
                          {a.lead_time && (
                            <div>
                              <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                                LEAD TIME
                              </span>
                              {a.lead_time}
                            </div>
                          )}
                          {a.instagram && (
                            <div>
                              <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                                INSTAGRAM
                              </span>
                              {a.instagram}
                            </div>
                          )}
                          {a.slug_preference && (
                            <div>
                              <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                                REQUESTED URL
                              </span>
                              /artist/{a.slug_preference}
                            </div>
                          )}
                        </div>
                        {a.bio && (
                          <div className="mt-4">
                            <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                              BIO
                            </span>
                            <p className="text-lightgrey">{a.bio}</p>
                          </div>
                        )}
                        {a.work_description && (
                          <div className="mt-4">
                            <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                              WORK DESCRIPTION
                            </span>
                            <p className="text-lightgrey">
                              {a.work_description}
                            </p>
                          </div>
                        )}
                        {a.why_makeshift && (
                          <div className="mt-4">
                            <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                              WHY MAKESHIFT
                            </span>
                            <p className="text-lightgrey">
                              {a.why_makeshift}
                            </p>
                          </div>
                        )}
                        {a.reviewer_notes && (
                          <div className="mt-4">
                            <span className="font-mono text-[10px] text-midgrey tracking-[0.1em] block mb-1">
                              REVIEWER NOTES
                            </span>
                            <p className="text-pink">{a.reviewer_notes}</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
