import React from "react"
import { CCard, CCardHeader, CCardBody, CRow, CCol, CBadge } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilBed } from "@coreui/icons"


const getColor = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "success"
    case "OCCUPIED":
      return "danger"
    case "CLEANING":
      return "warning"
    default:
      return "secondary"
  }
}

const BedOccupancyMap = ({ rooms }) => {

  return (
    <>
      {rooms.map((room) => (
        <CCard key={room.ID} className="mb-3">

          <CCardHeader>

            <strong>Room {room.RoomNumber}</strong>

            <span className="ms-2 text-muted">
              ({room.Ward?.Name})
            </span>

          </CCardHeader>

          <CCardBody>
            <CRow>
              {room.Beds?.map((bed) => (
                <CCol md={2} key={bed.ID} className="mb-3">

                  <div className="border rounded p-3 text-center bg-body">

                    <CIcon icon={cilBed} size="xl" />

                    <div className="mt-2">
                      <strong>{bed.BedNumber}</strong>
                    </div>

                    <CBadge color={getColor(bed.Status)} className="mt-2">
                      {bed.Status}
                    </CBadge>

                  </div>

                </CCol>
              ))}
            </CRow>
          </CCardBody>
        </CCard>

      ))}
    </>
  )
}

export default BedOccupancyMap