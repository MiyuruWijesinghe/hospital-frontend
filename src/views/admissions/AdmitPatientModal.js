import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CSpinner
} from '@coreui/react'

const AdmitPatientModal = ({
  visible,
  onClose,
  onSave,
  formData,
  errors,
  onChange,
  loading,
  patients,
  beds,
}) => {

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Admit Patient</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel>Patient</CFormLabel>
          <CFormSelect
            value={formData.patientId}
            onChange={(e) => onChange('patientId', e.target.value)}
            invalid={!!errors.patientId}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.ID} value={p.ID}>
                {p.FirstName} {p.LastName}
              </option>
            ))}
          </CFormSelect>
          {errors.patientId && <div className="text-danger small">{errors.patientId}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Bed</CFormLabel>
          <CFormSelect
            value={formData.bedId}
            onChange={(e) => onChange('bedId', e.target.value)}
            invalid={!!errors.bedId}
          >
            <option value="">Select Bed</option>
            {beds.map((b) => (
              <option key={b.ID} value={b.ID}>
                {b.BedNumber}
              </option>
            ))}
          </CFormSelect>
          {errors.bedId && <div className="text-danger small">{errors.bedId}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Reason</CFormLabel>
          <CFormInput
            value={formData.reason}
            onChange={(e) => onChange('reason', e.target.value)}
            invalid={!!errors.reason}
          />
          {errors.reason && <div className="text-danger small">{errors.reason}</div>}
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={onSave} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Admit'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AdmitPatientModal