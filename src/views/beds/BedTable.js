import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilArrowBottom } from '@coreui/icons'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react'

const BedTable = ({ beds, onEdit, onDelete, sortOrder, onSortChange }) => {
  return (
    <CTable bordered hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Ward</CTableHeaderCell>
          <CTableHeaderCell>Room</CTableHeaderCell>

          <CTableHeaderCell
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={onSortChange}
          >
            Bed Number
            <span
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <CIcon
                    icon={sortOrder === 'asc' ? cilArrowTop : cilArrowBottom}
                    size="sm"
              />
            </span>
          </CTableHeaderCell>

          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {beds.map((bed) => (
          <CTableRow key={bed.ID}>
            <CTableDataCell>{bed.Room?.Ward?.Name}</CTableDataCell>
            <CTableDataCell>{bed.Room?.RoomNumber}</CTableDataCell>
            <CTableDataCell>{bed.BedNumber}</CTableDataCell>
            <CTableDataCell>
              <CBadge
                color={
                  bed.Status === 'AVAILABLE'
                    ? 'success'
                    : bed.Status === 'OCCUPIED'
                    ? 'danger'
                    : 'warning'
                }
              >
                {bed.Status}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                color="info"
                size="sm"
                className="text-white me-2"
                onClick={() => onEdit(bed)}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                className="text-white"
                onClick={() => onDelete(bed)}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default BedTable