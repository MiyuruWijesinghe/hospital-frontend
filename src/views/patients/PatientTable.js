import React from "react"
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
} from "@coreui/react"

const PatientTable = ({ patients, onEdit, onDelete, sortOrder, onSortChange, }) => {

  return (
    <CTable bordered hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={onSortChange}
            >
            Full Name
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
          <CTableHeaderCell>Gender</CTableHeaderCell>
          <CTableHeaderCell>DOB</CTableHeaderCell>
          <CTableHeaderCell>Age</CTableHeaderCell>
          <CTableHeaderCell>Age Group</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {patients.map((patient) => (
          <CTableRow key={patient.ID}>
            <CTableDataCell>{patient.FullName}</CTableDataCell>
            <CTableDataCell>{patient.Gender}</CTableDataCell>
            <CTableDataCell>{patient.DOB}</CTableDataCell>
            <CTableDataCell>{patient.Age}</CTableDataCell>
            <CTableDataCell>
              <CBadge color="info">
                {patient.AgeGroup}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                color="info"
                size="sm"
                className="text-white me-2"
                onClick={() => onEdit(patient)}
              >
                Edit
              </CButton>

              <CButton
                color="danger"
                size="sm"
                className="text-white"
                onClick={() => onDelete(patient)}
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

export default PatientTable