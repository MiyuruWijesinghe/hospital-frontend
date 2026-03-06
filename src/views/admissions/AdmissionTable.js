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
  CBadge
} from '@coreui/react'

const AdmissionTable = ({ admissions, onView, sortOrder, onSortChange }) => {

  return (
    <CTable bordered hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={onSortChange}
          >
            Patient
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
          <CTableHeaderCell>Ward</CTableHeaderCell>
          <CTableHeaderCell>Room</CTableHeaderCell>
          <CTableHeaderCell>Bed</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {admissions.map((admission) => (
          <CTableRow key={admission.ID}>
            <CTableDataCell>
              {admission.Patient?.FirstName} {admission.Patient?.LastName}
            </CTableDataCell>
            <CTableDataCell>
              {admission.Bed?.Room?.Ward?.Name}
            </CTableDataCell>
            <CTableDataCell>
              {admission.Bed?.Room?.RoomNumber}
            </CTableDataCell>
            <CTableDataCell>
              {admission.Bed?.BedNumber}
            </CTableDataCell>

            <CTableDataCell>
              <CBadge color={admission.Status === "ACTIVE" ? "success" : "secondary"}>
                {admission.Status}
              </CBadge>
            </CTableDataCell>

            <CTableDataCell>
              <CButton
                size="sm"
                color="info"
                className="text-white"
                onClick={() => onView(admission)}
              >
                View
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default AdmissionTable