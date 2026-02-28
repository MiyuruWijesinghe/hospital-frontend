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
  CSpinner,
} from '@coreui/react'

const WardFormModal = ({
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
        <CModalTitle>Add Ward</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            invalid={!!errors.name}
          />
          {errors.name && <div className="text-danger small">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Type</CFormLabel>
          <CFormSelect
            value={formData.type}
            onChange={(e) => onChange('type', e.target.value)}
          >
            <option value="General">General</option>
            <option value="ICU">ICU</option>
          </CFormSelect>
        </div>

        <div className="mb-3">
          <CFormLabel>Floor</CFormLabel>
          <CFormInput
            type="number"
            value={formData.floor}
            onChange={(e) => onChange('floor', e.target.value)}
            invalid={!!errors.floor}
          />
          {errors.floor && <div className="text-danger small">{errors.floor}</div>}
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

export default WardFormModal