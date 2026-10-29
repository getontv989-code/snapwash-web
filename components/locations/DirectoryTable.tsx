"use client";

import { useId, useMemo, useState } from "react";
import { ArrowIcon, cx } from "@/components/site";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationButton, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
const pill = "w-[118px]";

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
            <Input
              variant="search"
              id={`${id}-q`}
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder={searchLabel}
              autoComplete="off"
            />
          </label>
          <p className="text-sm text-muted" aria-live="polite">
            {filtered.length === 0 ? "No matches" : `Showing ${start + 1}–${start + visible.length} of ${filtered.length}`}
          </p>
        </div>
      )}

      <Table className="text-left border-t-[1.5px] border-t-ink">
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((c, i) => (
              <TableHead key={c} className={cx(
                "py-4 pr-4 font-body font-medium text-xs leading-none tracking-kicker uppercase text-muted",
                i > 0 && "max-md:hidden",
              )}>{c}</TableHead>
            ))}
            <TableHead className="py-4 font-body font-medium text-xs leading-none tracking-kicker uppercase text-muted text-right"><span className="sr-only">Status</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((r) => (
            /* The whole row opens the page: <tr> can't anchor a stretched link in every browser, so it gets a click handler too */
            <TableRow key={r.id} onClick={r.href ? (e) => { if (!(e.target as HTMLElement).closest("a")) window.location.assign(r.href!); } : undefined}
              className={cx("relative transition-[background-color] duration-300 ease-brand", r.href && "group/row cursor-pointer hover:bg-wash")}>
              <TableHead scope="row" className="py-5 pr-4 align-middle font-display font-bold text-lg leading-[1.25] tracking-tight">
                {r.href ? (
                  <a href={r.href} className="no-underline after:absolute after:inset-0 group-hover/row:text-brand transition-colors duration-300">{r.name}</a>
                ) : (
                  <span className="text-muted">{r.name}</span>
                )}
                {/* On phones the middle columns fold into one line under the name */}
                <span className="md:hidden block mt-1 font-body font-normal text-sm leading-[1.4] tracking-normal text-muted">
                  {[r.cells[0], !r.href && (r.status ?? "Coming soon")].filter(Boolean).join(" · ")}
                </span>
              </TableHead>
              {r.cells.map((v, i) => (
                <TableCell key={i} className="py-5 pr-4 text-muted max-md:hidden">{v}</TableCell>
              ))}
              <TableCell className="py-5 text-right w-px whitespace-nowrap">
                {r.href ? (
                  /* Duplicate of the name link for pointer users, so it stays out of the tab order */
                  <a href={r.href} tabIndex={-1} aria-hidden="true" className="relative z-1 no-underline">
                    <Badge className={cx(pill, "gap-2 max-md:hidden")}>
                      View <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-brand group-hover/row:translate-x-0.5" />
                    </Badge>
                    <span className="md:hidden inline-grid place-items-center w-10 h-10 rounded-[50%] bg-brand text-on-brand align-middle">
                      <ArrowIcon className="w-[18px] h-[18px]" />
                    </span>
                  </a>
                ) : (
                  <Badge variant="secondary" className={cx(pill, "max-md:hidden")}>{r.status ?? "Coming soon"}</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
          {visible.length === 0 && (
            <tr><td colSpan={columns.length + 1} className="py-10 text-center text-muted">Nothing matches “{query}”. Try another name.</td></tr>
          )}
        </TableBody>
      </Table>

      {pages > 1 && (
        <Pagination aria-label={`${caption} pages`}>
          <PaginationContent>
            <PaginationItem>
              <PaginationButton disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Previous page">
                <ArrowIcon className="w-4 h-4 rotate-180" />
              </PaginationButton>
            </PaginationItem>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <PaginationItem key={n} className="max-sm:hidden">
                <PaginationButton isActive={n === current} onClick={() => setPage(n)} aria-label={`Page ${n}`}>{n}</PaginationButton>
              </PaginationItem>
            ))}
            <PaginationItem className="sm:hidden px-2 text-sm text-muted tabular-nums">Page {current} of {pages}</PaginationItem>
            <PaginationItem>
              <PaginationButton disabled={current === pages} onClick={() => setPage(current + 1)} aria-label="Next page">
                <ArrowIcon className="w-4 h-4" />
              </PaginationButton>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
