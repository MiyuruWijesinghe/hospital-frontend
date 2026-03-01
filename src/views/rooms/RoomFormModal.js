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

const RoomFormModal = ({
  visible,
  onClose,
  onSave,
  formData,
  errors,
  onChange,
  loading,
  wards,
}) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Add Room</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel>Ward</CFormLabel>
          <CFormSelect
            value={formData.wardID}
            onChange={(e) => onChange('wardID', e.target.value)}
            invalid={!!errors.wardID}
          >
            <option value="">Select Ward</option>
            {wards.map((ward) => (
              <option key={ward.ID} value={ward.ID}>
                {ward.Name}
              </option>
            ))}
          </CFormSelect>
          {errors.wardID && <div className="text-danger small">{errors.wardID}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Room Number</CFormLabel>
          <CFormInput
            value={formData.roomNumber}
            onChange={(e) => onChange('roomNumber', e.target.value)}
            invalid={!!errors.roomNumber}
          />
          {errors.roomNumber && <div className="text-danger small">{errors.roomNumber}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Room Type</CFormLabel>
          <CFormSelect
            value={formData.roomType}
            onChange={(e) => onChange('roomType', e.target.value)}
            invalid={!!errors.roomType}
          >
            <option value="">Select Type</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="SHARED">SHARED</option>
          </CFormSelect>
          {errors.roomType && <div className="text-danger small">{errors.roomType}</div>}
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

export default RoomFormModal