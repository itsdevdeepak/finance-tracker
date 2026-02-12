import React from "react";
import IconCaretLeft from "../icons/IconCaretLeft";
import IconCaretRight from "../icons/IconCaretRight";
import styles from "./pagination.module.css";

function arrayFromRange(start: number, end: number) {
  if (start < 0 || end < 0 || start > end) return [];
  return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
}

function getPaginationPages(current: number, total: number, pageToShow = 5) {
  if (total <= pageToShow) {
    return arrayFromRange(1, total);
  }

  const windowSize = pageToShow - 2;

  let start = Math.max(2, current - Math.floor(windowSize / 2));
  let end = start + (windowSize - 1);

  if (end >= total) {
    end = total - 1;
    start = Math.max(2, end - (windowSize - 1));
  }

  return [1, ...arrayFromRange(start, end), total];
}

export default function Pagination({
  currentPage,
  totalPages,
  inTransition,
  updatePage,
}: {
  currentPage: number;
  totalPages: number;
  inTransition: boolean;
  updatePage: (newPage: number) => void;
}) {
  const pages = getPaginationPages(currentPage, totalPages, 7);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage - 1 < 1 || inTransition}
      >
        <IconCaretLeft />
        <span className="label">Prev</span>
      </button>

      {pages.map((pageNo) => (
        <React.Fragment key={pageNo}>
          {pageNo === currentPage + 1 && currentPage + 1 < totalPages && (
            <button
              aria-hidden
              disabled={inTransition}
              className="ellipses"
              tabIndex={-1}
            >
              ...
            </button>
          )}
          <button
            data-active={pageNo === currentPage}
            onClick={() => pageNo !== currentPage && updatePage(pageNo)}
            disabled={inTransition}
          >
            {pageNo}
          </button>
          {pageNo === currentPage - 1 && pageNo >= totalPages - 2 && (
            <div className="ellipses">...</div>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage + 1 > totalPages || inTransition}
      >
        <span className="label">Next</span>
        <IconCaretRight />
      </button>
    </div>
  );
}
