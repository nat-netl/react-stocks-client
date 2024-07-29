import React from "react";

interface IPagination {
  pageNumber: number;
}

const Pagination: React.FC<IPagination> = ({ pageNumber }) => {
  return <span>{pageNumber}</span>;
};

export default Pagination;
