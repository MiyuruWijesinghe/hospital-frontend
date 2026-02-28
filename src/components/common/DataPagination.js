import React from 'react'
import {
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const DataPagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1
  const indexOfLastItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  )

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">

      <small>
        Showing {indexOfFirstItem} to {indexOfLastItem} of {totalItems} entries
      </small>

      <CPagination align="end">

        {/* Previous */}
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </CPaginationItem>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1
          return (
            <CPaginationItem
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </CPaginationItem>
          )
        })}

        {/* Next */}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </CPaginationItem>

      </CPagination>
    </div>
  )
}

export default DataPagination