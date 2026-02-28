import React, { useEffect, useState } from 'react'
import API from '../../services/api'

import WardTable from './WardTable'
import WardFormModal from './WardFormModal'
import WardEditModal from './WardEditModal'
import WardDeleteModal from './WardDeleteModal'
import { validateWard } from './wardValidation'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'

const Wards = () => {
  const [wards, setWards] = useState([])

  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    type: 'General',
    floor: '',
  })

  const [editData, setEditData] = useState({
    id: null,
    name: '',
    type: 'General',
    floor: '',
  })

  const [selectedWard, setSelectedWard] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

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

  // ======================
  // CREATE HANDLERS
  // ======================

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleSave = async () => {
    const validationErrors = validateWard(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.post('/wards', {
        ...formData,
        floor: parseInt(formData.floor),
      })

      setVisible(false)
      setFormData({ name: '', type: 'General', floor: '' })
      setErrors({})
      setToastMessage('Ward created successfully!')
      setToastVisible(true)
      fetchWards()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // EDIT HANDLERS
  // ======================

  const handleEditClick = (ward) => {
    setEditData({
      id: ward.ID,
      name: ward.Name,
      type: ward.Type,
      floor: ward.Floor,
    })
    setEditVisible(true)
  }

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleEditSubmit = async () => {
    const validationErrors = validateWard(editData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.put(`/wards/${editData.id}`, {
        name: editData.name,
        type: editData.type,
        floor: parseInt(editData.floor),
      })

      setEditVisible(false)
      setToastMessage('Ward updated successfully!')
      setToastVisible(true)
      fetchWards()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // DELETE HANDLERS
  // ======================

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
          <WardTable
            wards={wards}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </CCardBody>
      </CCard>

      {/* Add Modal */}
      <WardFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSave}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        loading={loading}
      />

      {/* Edit Modal */}
      <WardEditModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onUpdate={handleEditSubmit}
        editData={editData}
        errors={errors}
        onChange={handleEditChange}
        loading={loading}
      />

      {/* Delete Modal */}
      <WardDeleteModal
        visible={deleteVisible}
        ward={selectedWard}
        onClose={() => setDeleteVisible(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Toast */}
      <CToaster placement="top-end">
        <CToast
          visible={toastVisible}
          autohide
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