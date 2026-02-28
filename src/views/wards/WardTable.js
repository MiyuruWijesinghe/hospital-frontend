import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'

const WardTable = ({ wards, onEdit, onDelete }) => {
  return (
    <CTable bordered hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Type</CTableHeaderCell>
          <CTableHeaderCell>Floor</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {wards.map((ward) => (
          <CTableRow key={ward.ID}>
            <CTableDataCell>{ward.Name}</CTableDataCell>
            <CTableDataCell>{ward.Type}</CTableDataCell>
            <CTableDataCell>{ward.Floor}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="info"
                size="sm"
                className="text-white me-2"
                onClick={() => onEdit(ward)}
              >
                Edit
              </CButton>

              <CButton
                color="danger"
                size="sm"
                className="text-white"
                onClick={() => onDelete(ward)}
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

export default WardTable