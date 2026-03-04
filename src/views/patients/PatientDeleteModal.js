import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'

const PatientDeleteModal = ({ visible, patient, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Delete Patient</CModalTitle>
      </CModalHeader>

      <CModalBody>
        Are you sure you want to delete patient <strong>{patient?.FullName}</strong>?
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

export default PatientDeleteModal