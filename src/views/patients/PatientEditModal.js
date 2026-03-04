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

const PatientEditModal = ({
  visible,
  onClose,
  onUpdate,
  editData,
  errors,
  onChange,
  loading,
}) => {

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit Patient</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel>First Name</CFormLabel>
          <CFormInput
            value={editData.firstName || ''}
            onChange={(e) => onChange("firstName", e.target.value)}
            invalid={!!errors.firstName}
          />
          {errors.firstName && <div className="text-danger small">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput
            value={editData.lastName || ''}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Gender</CFormLabel>
          <CFormSelect
            value={editData.gender || 'Male'}
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
            value={editData.dob || ''}
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

        <CButton
          color="success"
          className="text-white"
          onClick={onUpdate}
          disabled={loading}
        >
          {loading ? <CSpinner size="sm" /> : 'Update'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PatientEditModal