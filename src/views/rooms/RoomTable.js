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
} from '@coreui/react'

const RoomTable = ({ rooms, onEdit, onDelete, sortOrder, onSortChange }) => {
  return (
    <CTable bordered hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Ward</CTableHeaderCell>

          <CTableHeaderCell
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={onSortChange}
            >
            Room Number
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
          <CTableHeaderCell>Room Type</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {rooms.map((room) => (
          <CTableRow key={room.ID}>
            <CTableDataCell>{room.Ward?.Name}</CTableDataCell>
            <CTableDataCell>{room.RoomNumber}</CTableDataCell>
            <CTableDataCell>{room.RoomType}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="info"
                size="sm"
                className="text-white me-2"
                onClick={() => onEdit(room)}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                className="text-white"
                onClick={() => onDelete(room)}
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

export default RoomTable