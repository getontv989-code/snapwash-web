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

const pill = "inline-flex items-center rounded-pill py-[7px] px-3 font-body font-medium text-xs leading-none tracking-note whitespace-nowrap";

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
                i > 1 && "max-md:hidden",
              )}>{c}</th>
            ))}
            <th scope="col" className="py-4 font-body font-medium text-xs leading-none tracking-kicker uppercase text-muted text-right"><span className="sr-only">Status</span></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((r) => (
            <tr key={r.id} className={cx("relative border-b border-b-line transition-[background-color] duration-300 ease-brand", r.href && "group/row hover:bg-wash")}>
              <th scope="row" className="py-5 pr-4 font-display font-bold text-lg leading-[1.2] tracking-tight">
                {r.href ? (
                  <a href={r.href} className="no-underline after:absolute after:inset-0 group-hover/row:text-brand transition-colors duration-300">{r.name}</a>
                ) : (
                  <span className="text-muted">{r.name}</span>
                )}
              </th>
              {r.cells.map((v, i) => (
                <td key={i} className={cx("py-5 pr-4 text-muted", i > 0 && "max-md:hidden")}>{v}</td>
              ))}
              <td className="py-5 text-right">
                {r.href ? (
                  <span className={cx(pill, "gap-2 bg-brand text-on-brand")}>
                    View <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-brand group-hover/row:translate-x-0.5" />
                  </span>
                ) : (
                  <span className={cx(pill, "bg-ink/6 text-muted")}>{r.status ?? "Coming soon"}</span>
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
            <PageBtn key={n} active={n === current} onClick={() => setPage(n)} label={`Page ${n}`}>{n}</PageBtn>
          ))}
          <PageBtn disabled={current === pages} onClick={() => setPage(current + 1)} label="Next page">
            <ArrowIcon className="w-4 h-4" />
          </PageBtn>
        </nav>
      )}
    </div>
  );
}

function PageBtn({ children, onClick, label, active = false, disabled = false }: {
  children: React.ReactNode; onClick: () => void; label: string; active?: boolean; disabled?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} aria-current={active ? "page" : undefined}
      className={cx(
        "min-w-11 h-11 px-3 inline-grid place-items-center rounded-pill border-0 cursor-pointer font-body font-semibold text-sm tabular-nums",
        "transition-[background-color,color,opacity] duration-300 ease-brand",
        active ? "bg-brand text-on-brand" : "bg-ink/6 text-ink hover:bg-ink/12",
        "disabled:opacity-35 disabled:cursor-default disabled:hover:bg-ink/6",
      )}>{children}</button>
  );
}
