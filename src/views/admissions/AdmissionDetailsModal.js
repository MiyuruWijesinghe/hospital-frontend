import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormLabel,
  CButton,
  CSpinner,
} from '@coreui/react'

const AdmissionDetailsModal = ({
  visible,
  onClose,
  admission,
  onDischarge,
  loading
}) => {

  if (!admission) return null

  const isActive = admission.Status === "ACTIVE"

  const formatDate = (date) => {
    if (!date) return "—"
    return new Date(date).toLocaleString()
  }

  return (
    <CModal visible={visible} onClose={onClose}>

      <CModalHeader>
        <CModalTitle>Admission Details</CModalTitle>
      </CModalHeader>

      <CModalBody>

        <div className="mb-3">
          <CFormLabel>Patient</CFormLabel>
          <CFormInput
            value={`${admission.Patient?.FirstName} ${admission.Patient?.LastName}`}
            disabled
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Ward</CFormLabel>
          <CFormInput
            value={admission.Bed?.Room?.Ward?.Name || ''}
            disabled
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Room</CFormLabel>
          <CFormInput
            value={admission.Bed?.Room?.RoomNumber || ''}
            disabled
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Bed</CFormLabel>
          <CFormInput
            value={admission.Bed?.BedNumber || ''}
            disabled
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Reason</CFormLabel>
          <CFormInput
            value={admission.Reason || ''}
            disabled
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Status</CFormLabel>
          <CFormInput
            value={admission.Status}
            disabled
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Admitted At</CFormLabel>
          <CFormInput 
            value={formatDate(admission.AdmittedAt)} 
            disabled />
        </div>

        <div className="mb-3">
          <CFormLabel>Discharged At</CFormLabel>
          <CFormInput 
            value={formatDate(admission.DischargedAt)} 
            disabled />
        </div>
      </CModalBody>

      <CModalFooter>

        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>

        <CButton
          color="danger"
          className="text-white"
          disabled={!isActive || loading}
          onClick={onDischarge}
        >
          {loading ? <CSpinner size="sm"/> : "Discharge"}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AdmissionDetailsModal