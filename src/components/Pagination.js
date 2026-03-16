import './Pagination.css'

const Pagination = ({currentPage, onPageChange}) => (
  <div className="pagination">
    <button
      type="button"
      className="page-btn"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <p className="current-page-number">{currentPage}</p>
    <button
      type="button"
      className="page-btn"
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
)

export default Pagination
