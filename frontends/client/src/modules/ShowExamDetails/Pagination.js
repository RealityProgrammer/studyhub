import ReactPaginate from "react-paginate";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    return (
        <div className="pagination-full-width">
            <span>Page {currentPage + 1} of {totalPages}</span>
            <div className="pagination">
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={onPageChange}
                    nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                    previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                    pageRangeDisplayed={3}
                    forcePage={currentPage}
                    pageCount={totalPages}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}
