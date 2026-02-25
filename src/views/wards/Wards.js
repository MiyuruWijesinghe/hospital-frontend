import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
  CFormSelect,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'

const Wards = () => {
  const [wards, setWards] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [confirmVisible, setConfirmVisible] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [errors, setErrors] = useState({})

  const [deleteVisible, setDeleteVisible] = useState(false)
  const [selectedWard, setSelectedWard] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    type: 'General',
    floor: '',
  })

  useEffect(() => {
    fetchWards()
  }, [])

  const fetchWards = async () => {
    try {
      const res = await API.get('/wards')
      setWards(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await API.post('/wards', {
        name: formData.name,
        type: formData.type,
        floor: parseInt(formData.floor),
      })

      setConfirmVisible(false)
      setVisible(false)
      setToastMessage('Ward created successfully!')
      setToastVisible(true)
      setFormData({ name: '', type: 'General', floor: '' })
      setErrors({})
      fetchWards()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    let newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Ward name is required'
    }

    if (!formData.floor) {
      newErrors.floor = 'Floor is required'
    } else if (parseInt(formData.floor) <= 0) {
      newErrors.floor = 'Floor must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveClick = () => {
    if (validateForm()) {
      setConfirmVisible(true)
    }
  }

  const handleDeleteClick = (ward) => {
    setSelectedWard(ward)
    setDeleteVisible(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedWard) return

    try {
      await API.delete(`/wards/${selectedWard.ID}`)

      setDeleteVisible(false)
      setToastMessage('Ward deleted successfully!')
      setToastVisible(true)
      fetchWards()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          Wards
          <CButton
            color="primary"
            className="float-end"
            onClick={() => setVisible(true)}
          >
            Add Ward
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CTable bordered hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Floor</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {wards.map((ward) => (
                <CTableRow key={ward.ID}>
                  <CTableDataCell>{ward.Name}</CTableDataCell>
                  <CTableDataCell>{ward.Type}</CTableDataCell>
                  <CTableDataCell>{ward.Floor}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      size="sm"
                      className="text-white"
                      onClick={() => handleDeleteClick(ward)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Ward</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel>Ward Name</CFormLabel>
              <CFormInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                invalid={!!errors.name}
              />
              {errors.name && (
                <div className="text-danger small">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <CFormLabel>Ward Type</CFormLabel>
              <CFormSelect
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="ICU">ICU</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel>Floor</CFormLabel>
              <CFormInput
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                invalid={!!errors.floor}
              />
              {errors.floor && (
                <div className="text-danger small">{errors.floor}</div>
              )}
            </div>
          </CForm>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>

          <CButton color="primary" onClick={handleSaveClick} disabled={loading}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={confirmVisible} onClose={() => setConfirmVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Action</CModalTitle>
        </CModalHeader>

        <CModalBody>
          Are you sure you want to create this ward?
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setConfirmVisible(false)}>
            Cancel
          </CButton>

          <CButton color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Confirm'}
          </CButton>
        </CModalFooter>
      </CModal>        

      <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
        <CModalHeader>
          <CModalTitle>Delete Ward</CModalTitle>
        </CModalHeader>

        <CModalBody>
          Are you sure you want to delete ward:
          <strong> {selectedWard?.Name}</strong> ?
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
            Cancel
          </CButton>

          <CButton color="danger" onClick={handleDeleteConfirm}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>        

      <CToaster placement="top-end">
        <CToast
          visible={toastVisible}
          autohide={true}
          delay={3000}
          color="success"
          className="text-white"
          onClose={() => setToastVisible(false)}
        >
          <div className="d-flex">
            <CToastBody>{toastMessage}</CToastBody>
            <CToastClose className="me-2 m-auto" white />
          </div>
        </CToast>
      </CToaster>        
    </>
  )
}

export default Wards