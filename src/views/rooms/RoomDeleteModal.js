import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'

const RoomDeleteModal = ({ visible, room, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Delete Room</CModalTitle>
      </CModalHeader>

      <CModalBody>
        Are you sure you want to delete room <strong>{room?.RoomNumber}</strong>?
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>

        <CButton color="danger" className="text-white" onClick={onConfirm}>
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default RoomDeleteModal