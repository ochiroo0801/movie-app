import React from "react";

import "../Styles/pagination.scss";

function Pagination({ handlePageChange, page }) {
  return (
    <div className="pagination">
      <button
        className={page !== 1 ? "btn" : "not-allow"}
        onClick={() => handlePageChange("prev")}
      >
        Prev
      </button>
      <button className="btn" onClick={() => handlePageChange("next")}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
