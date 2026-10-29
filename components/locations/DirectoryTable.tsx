"use client";

import { useId, useMemo, useState } from "react";
import { ArrowIcon, cx } from "@/components/ui";

export type DirectoryRow = {
  id: string;
  name: string;
  /** Rows without a page show their status instead of a link */
  href?: string;
  status?: string;
  /** Values for the middle columns, in order */
  cells: string[];
};

/* Fixed width so View and status pills line up down the column */
const pill = "inline-flex items-center justify-center w-[118px] rounded-pill py-2 px-3 font-body font-medium text-xs leading-none tracking-note whitespace-nowrap";

/** Searchable, paginated list of states, cities, neighborhoods or shops. */
export function DirectoryTable({ caption, columns, rows, pageSize = 10, searchable = rows.length > pageSize, searchLabel = "Search" }: {
  caption: string;
  /** Header for the name column, then one per entry in `cells` */
  columns: string[];
  rows: DirectoryRow[];
  pageSize?: number;
  searchable?: boolean;
  searchLabel?: string;
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => [r.name, ...r.cells].some((v) => v.toLowerCase().includes(q)));
  }, [rows, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const start = (current - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  return (
    <div className="grid gap-5">
      {searchable && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="relative w-full max-w-[420px]" htmlFor={`${id}-q`}>
            <span className="sr-only">{searchLabel}</span>
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>
            <input
              id={`${id}-q`}
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder={searchLabel}
              autoComplete="off"
              className="w-full min-h-[52px] rounded-pill border-0 bg-surface pl-[50px] pr-5 text-ink font-body text-base shadow-[inset_0_0_0_1.5px_var(--line)] placeholder:text-muted transition-shadow duration-300 focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--blue)]"
            />
          </label>
          <p className="text-sm text-muted" aria-live="polite">
            {filtered.length === 0 ? "No matches" : `Showing ${start + 1}–${start + visible.length} of ${filtered.length}`}
          </p>
        </div>
      )}

      <table className="w-full border-collapse text-left border-t-[1.5px] border-t-ink">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-b-line">
            {columns.map((c, i) => (
              <th key={c} scope="col" className={cx(
                "py-4 pr-4 font-body font-medium text-xs leading-none tracking-kicker uppercase text-muted",
                i > 0 && "max-md:hidden",
              )}>{c}</th>
            ))}
            <th scope="col" className="py-4 font-body font-medium text-xs leading-none tracking-kicker uppercase text-muted text-right"><span className="sr-only">Status</span></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((r) => (
            <tr key={r.id} className={cx("relative border-b border-b-line transition-[background-color] duration-300 ease-brand", r.href && "group/row hover:bg-wash")}>
              <th scope="row" className="py-5 pr-4 align-middle font-display font-bold text-lg leading-[1.25] tracking-tight">
                {r.href ? (
                  <a href={r.href} className="no-underline after:absolute after:inset-0 group-hover/row:text-brand transition-colors duration-300">{r.name}</a>
                ) : (
                  <span className="text-muted">{r.name}</span>
                )}
                {/* On phones the middle columns fold into one line under the name */}
                <span className="md:hidden block mt-1 font-body font-normal text-sm leading-[1.4] tracking-normal text-muted">
                  {[r.cells[0], !r.href && (r.status ?? "Coming soon")].filter(Boolean).join(" · ")}
                </span>
              </th>
              {r.cells.map((v, i) => (
                <td key={i} className="py-5 pr-4 align-middle text-muted max-md:hidden">{v}</td>
              ))}
              <td className="py-5 align-middle text-right w-px whitespace-nowrap">
                {r.href ? (
                  <>
                    <span className={cx(pill, "gap-2 bg-brand text-on-brand max-md:hidden")}>
                      View <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-brand group-hover/row:translate-x-0.5" />
                    </span>
                    <span className="md:hidden inline-grid place-items-center w-10 h-10 rounded-[50%] bg-brand text-on-brand align-middle" aria-hidden="true">
                      <ArrowIcon className="w-[18px] h-[18px]" />
                    </span>
                  </>
                ) : (
                  <span className={cx(pill, "bg-ink/6 text-muted max-md:hidden")}>{r.status ?? "Coming soon"}</span>
                )}
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr><td colSpan={columns.length + 1} className="py-10 text-center text-muted">Nothing matches “{query}”. Try another name.</td></tr>
          )}
        </tbody>
      </table>

      {pages > 1 && (
        <nav className="flex flex-wrap items-center gap-2" aria-label={`${caption} pages`}>
          <PageBtn disabled={current === 1} onClick={() => setPage(current - 1)} label="Previous page">
            <ArrowIcon className="w-4 h-4 rotate-180" />
          </PageBtn>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <PageBtn key={n} active={n === current} onClick={() => setPage(n)} label={`Page ${n}`} className="max-sm:hidden">{n}</PageBtn>
          ))}
          <span className="sm:hidden px-2 text-sm text-muted tabular-nums">Page {current} of {pages}</span>
          <PageBtn disabled={current === pages} onClick={() => setPage(current + 1)} label="Next page">
            <ArrowIcon className="w-4 h-4" />
          </PageBtn>
        </nav>
      )}
    </div>
  );
}

function PageBtn({ children, onClick, label, active = false, disabled = false, className }: {
  children: React.ReactNode; onClick: () => void; label: string; active?: boolean; disabled?: boolean; className?: string;
}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} aria-current={active ? "page" : undefined}
      className={cx(
        "min-w-11 h-11 px-3 inline-grid place-items-center rounded-pill border-0 cursor-pointer font-body font-semibold text-sm tabular-nums",
        "transition-[background-color,color,opacity] duration-300 ease-brand",
        active ? "bg-brand text-on-brand" : "bg-ink/6 text-ink hover:bg-ink/12",
        "disabled:opacity-35 disabled:cursor-default disabled:hover:bg-ink/6",
        className,
      )}>{children}</button>
  );
}
