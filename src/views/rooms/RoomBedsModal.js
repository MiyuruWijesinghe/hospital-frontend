import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CRow,
  CCol,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBed } from '@coreui/icons'

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

const RoomBedsModal = ({ visible, onClose, room }) => {

  if (!room) return null

  return (
    <CModal visible={visible} onClose={onClose} size="lg">

      <CModalHeader>
        <CModalTitle>
          Room {room.RoomNumber}
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CRow>

          {room.Beds?.map((bed) => (
            <CCol md={3} key={bed.ID} className="mb-3">

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
      </CModalBody>
    </CModal>
  )
}

export default RoomBedsModal