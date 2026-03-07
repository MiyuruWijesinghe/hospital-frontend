import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol,
  CBadge,
  CSpinner
} from '@coreui/react'

const formatDate = (date) => {
  if (!date) return "—"
  return new Date(date).toLocaleString()
}

const getStatusColor = (status) => {
  if (status === "ACTIVE") return "success"
  if (status === "DISCHARGED") return "secondary"
  return "warning"
}

const AdmissionDetailsModal = ({
  visible,
  onClose,
  admission,
  onDischarge,
  loading
}) => {

  if (!admission) return null

  return (
    <CModal visible={visible} onClose={onClose} size="lg">

      <CModalHeader>
        <CModalTitle>Admission Details</CModalTitle>
      </CModalHeader>

      <CModalBody>

        {/* Row 1 */}
        <CRow className="mb-3 align-items-center">
          <CCol md={3}>
            <div className="text-medium-emphasis small">Patient</div>
          </CCol>

          <CCol md={5}>
            <div>{admission.Patient?.FirstName} {admission.Patient?.LastName}</div>
          </CCol>

          <CCol md={2}>
            <div className="text-medium-emphasis small">Status</div>
          </CCol>

          <CCol md={2}>
            <CBadge color={getStatusColor(admission.Status)}>
              {admission.Status}
            </CBadge>
          </CCol>
        </CRow>

        {/* Row 2 */}
        <CRow className="mb-3">
          <CCol md={3}>
            <div className="text-medium-emphasis small">Ward</div>
          </CCol>

          <CCol md={9}>
            <div>{admission.Bed?.Room?.Ward?.Name}</div>
          </CCol>
        </CRow>

        {/* Row 3 */}
        <CRow className="mb-3">
          <CCol md={3}>
            <div className="text-medium-emphasis small">Room</div>
          </CCol>

          <CCol md={9}>
            <div>{admission.Bed?.Room?.RoomNumber}</div>
          </CCol>
        </CRow>

        {/* Row 4 */}
        <CRow className="mb-3">
          <CCol md={3}>
            <div className="text-medium-emphasis small">Bed</div>
          </CCol>

          <CCol md={9}>
            <div>{admission.Bed?.BedNumber}</div>
          </CCol>
        </CRow>

        {/* Row 5 */}
        <CRow className="mb-3">
          <CCol md={3}>
            <div className="text-medium-emphasis small">Reason</div>
          </CCol>

          <CCol md={9}>
            <div>{admission.Reason}</div>
          </CCol>
        </CRow>

        {/* Row 6 */}
        <CRow className="mb-3">
          <CCol md={3}>
            <div className="text-medium-emphasis small">Admitted At</div>
          </CCol>

          <CCol md={9}>
            <div>{formatDate(admission.AdmittedAt)}</div>
          </CCol>
        </CRow>

        {/* Row 7 */}
        <CRow className="mb-3">
          <CCol md={3}>
            <div className="text-medium-emphasis small">Discharged At</div>
          </CCol>

          <CCol md={9}>
            <div>{formatDate(admission.DischargedAt)}</div>
          </CCol>
        </CRow>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>

        <CButton
          color="danger"
          className="text-white"
          disabled={admission.Status !== "ACTIVE" || loading}
          onClick={onDischarge}
        >
          {loading ? <CSpinner size="sm"/> : "Discharge"}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AdmissionDetailsModal