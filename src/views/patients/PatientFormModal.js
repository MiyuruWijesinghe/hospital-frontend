import React from "react"
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
} from "@coreui/react"

const PatientFormModal = ({
  visible,
  onClose,
  onSave,
  formData,
  errors,
  onChange,
  loading,
}) => {

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Add Patient</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel>First Name</CFormLabel>
          <CFormInput
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            invalid={!!errors.firstName}
          />
          {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Gender</CFormLabel>
          <CFormSelect
            value={formData.gender}
            onChange={(e) => onChange("gender", e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </CFormSelect>
        </div>

        <div className="mb-3">
          <CFormLabel>Date of Birth</CFormLabel>
          <CFormInput
            type="date"
            value={formData.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            invalid={!!errors.dob}
          />
          {errors.dob && <div className="text-danger small">{errors.dob}</div>}
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>

        <CButton color="primary" onClick={onSave} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Save'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PatientFormModal