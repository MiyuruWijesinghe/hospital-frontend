import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'

const BedDeleteModal = ({ visible, bed, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Delete Bed</CModalTitle>
      </CModalHeader>

      <CModalBody>
        Are you sure you want to delete bed <strong>{bed?.BedNumber}</strong>?
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

export default BedDeleteModal