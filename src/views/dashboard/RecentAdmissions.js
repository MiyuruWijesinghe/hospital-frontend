import React from "react"
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from "@coreui/react"

const RecentAdmissions = ({ admissions }) => {

  return (

    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Patient</CTableHeaderCell>
          <CTableHeaderCell>Ward</CTableHeaderCell>
          <CTableHeaderCell>Room</CTableHeaderCell>
          <CTableHeaderCell>Bed</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>

        {admissions.map((a) => (

          <CTableRow key={a.ID}>

            <CTableDataCell>
              {a.Patient?.FirstName} {a.Patient?.LastName}
            </CTableDataCell>

            <CTableDataCell>
              {a.Bed?.Room?.Ward?.Name}
            </CTableDataCell>

            <CTableDataCell>
              {a.Bed?.Room?.RoomNumber}
            </CTableDataCell>

            <CTableDataCell>
              {a.Bed?.BedNumber}
            </CTableDataCell>

            <CTableDataCell>
              {a.Status}
            </CTableDataCell>

          </CTableRow>

        ))}

      </CTableBody>
    </CTable>
  )
}

export default RecentAdmissions