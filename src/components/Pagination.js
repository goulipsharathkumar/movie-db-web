import './Pagination.css'

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const maxVisible = 5
  let start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1)

  const pages = []
  for (let i = start; i <= end; i += 1) pages.push(i)

  return (
    <div className="pagination">
      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {start > 1 && (
        <>
          <button
            type="button"
            className="page-btn"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="ellipsis">…</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          type="button"
          className={`page-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="ellipsis">…</span>}
          <button
            type="button"
            className="page-btn"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  )
}

export default Pagination
