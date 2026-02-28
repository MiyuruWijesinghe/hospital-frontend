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

const WardEditModal = ({
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
        <CModalTitle>Edit Ward</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel>Ward Name</CFormLabel>
          <CFormInput
            value={editData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            invalid={!!errors.name}
          />
          {errors.name && (
            <div className="text-danger small">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <CFormLabel>Ward Type</CFormLabel>
          <CFormSelect
            value={editData.type || 'General'}
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
            value={editData.floor || ''}
            onChange={(e) => onChange('floor', e.target.value)}
            invalid={!!errors.floor}
          />
          {errors.floor && (
            <div className="text-danger small">{errors.floor}</div>
          )}
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

export default WardEditModal