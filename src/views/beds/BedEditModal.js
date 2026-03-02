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

const BedEditModal = ({
  visible,
  onClose,
  onUpdate,
  editData,
  errors,
  onChange,
  loading,
  rooms,
}) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit Bed</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel>Room</CFormLabel>
          <CFormSelect
            value={editData.roomID || ''}
            onChange={(e) => onChange('roomID', e.target.value)}
            invalid={!!errors.roomID}
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.ID} value={room.ID}>
                {room.RoomNumber} ({room.Ward?.Name})
              </option>
            ))}
          </CFormSelect>
          {errors.roomID && <div className="text-danger small">{errors.roomID}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Bed Number</CFormLabel>
          <CFormInput
            value={editData.bedNumber || ''}
            onChange={(e) => onChange('bedNumber', e.target.value)}
            invalid={!!errors.bedNumber}
          />
          {errors.bedNumber && <div className="text-danger small">{errors.bedNumber}</div>}
        </div>

        <div className="mb-3">
          <CFormLabel>Status</CFormLabel>
          <CFormSelect
            value={editData.status || 'AVAILABLE'}
            onChange={(e) => onChange('status', e.target.value)}
            invalid={!!errors.status}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="OCCUPIED">OCCUPIED</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </CFormSelect>
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

export default BedEditModal