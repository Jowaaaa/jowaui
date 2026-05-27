import React from "react";

export interface PaginationProps {
  /** Currently active page (1-based) */
  page: number;
  /** Total number of items across all pages */
  total: number;
  /** Number of items per page used to calculate total pages (default: 10) */
  pageSize?: number;
  /** Number of page buttons shown on each side of the current page (default: 1) */
  siblingCount?: number;
  /** Callback fired with the new page number when a button is clicked */
  onChange: (page: number) => void;
  /** Additional CSS class applied to the nav element */
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  pageSize = 10,
  siblingCount = 1,
  onChange,
  className = "",
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pages = React.useMemo(() => {
    const left = Math.max(2, page - siblingCount);
    const right = Math.min(totalPages - 1, page + siblingCount);
    const items: (number | "…")[] = [1];
    if (left > 2) items.push("…");
    items.push(...range(left, right));
    if (right < totalPages - 1) items.push("…");
    if (totalPages > 1) items.push(totalPages);
    return items;
  }, [page, totalPages, siblingCount]);

  const classes = ["jowa-pagination", className].filter(Boolean).join(" ");

  return (
    <nav aria-label="Pagination" className={classes}>
      <button
        className="jowa-pagination__btn"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="jowa-pagination__ellipsis" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            className={[
              "jowa-pagination__btn",
              p === page ? "jowa-pagination__btn--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onChange(p as number)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        )
      )}

      <button
        className="jowa-pagination__btn"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};

Pagination.displayName = "Pagination";
