import React, { useEffect, useState, useMemo } from 'react'
import API from '../../services/api'
import BedTable from './BedTable'
import BedFormModal from './BedFormModal'
import BedEditModal from './BedEditModal'
import BedDeleteModal from './BedDeleteModal'
import { validateBed } from './bedValidation'
import DataPagination from '../../components/common/DataPagination'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CFormInput,
  CFormSelect
} from '@coreui/react'

const Beds = () => {
  const [rooms, setRooms] = useState([])
  const [beds, setBeds] = useState([])

  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const [formData, setFormData] = useState({ 
    roomID: '', 
    bedNumber: '', 
    status: 'AVAILABLE' 
  })

  const [editData, setEditData] = useState({ 
    id: null,
    roomID: '', 
    bedNumber: '', 
    status: 'AVAILABLE' 
  })

  const [selectedBed, setSelectedBed] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    fetchBeds()
    fetchRooms()
  }, [])

  const fetchBeds = async () => {
    try {
      const res = await API.get('/beds')
      setBeds(res.data) 
    } catch (err) {
      console.error(err)
    }
  }

  const fetchRooms = async () => {
    try {
      const res = await API.get('/rooms')
      setRooms(res.data)  
    } catch (err) {
      console.error(err)  
    }
  }

  const filteredBeds = useMemo(() => {
    return beds
      .filter((bed) => {
        const term = searchTerm.toLowerCase()

        return (
          bed.Room.Ward.Name?.toLowerCase().includes(term) ||
          bed.Room.RoomNumber?.toLowerCase().includes(term) ||
          bed.BedNumber?.toLowerCase().includes(term) ||
          bed.Status?.toLowerCase().includes(term)
        )
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.BedNumber.localeCompare(b.BedNumber)
        }
        return b.BedNumber.localeCompare(a.BedNumber)
      })
  }, [beds, searchTerm, sortOrder])

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage
    const first = last - itemsPerPage
    return filteredBeds.slice(first, last)
  }, [filteredBeds, currentPage, itemsPerPage])

  
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
    const validationErrors = validateBed(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.post('/beds', {
        ...formData,
        roomID: parseInt(formData.roomID),
      })

      setVisible(false)
      setFormData({ roomID: '', bedNumber: '', status: 'AVAILABLE' })
      setErrors({})
      setToastMessage('Bed created successfully!')
      setToastVisible(true)
      fetchBeds()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // EDIT HANDLERS
  // ======================

  const handleEditClick = (bed) => {
    setEditData({
      id: bed.ID,
      roomID: bed.RoomID,
      bedNumber: bed.BedNumber,
      status: bed.Status,
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
    const validationErrors = validateBed(editData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.put(`/beds/${editData.id}`, {
        roomID: parseInt(editData.roomID),
        bedNumber: editData.bedNumber,
        status: editData.status,
      })

      setEditVisible(false)
      setToastMessage('Bed updated successfully!')
      setToastVisible(true)
      fetchBeds()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // DELETE HANDLERS
  // ======================

  const handleDeleteClick = (bed) => {
    setSelectedBed(bed)
    setDeleteVisible(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedBed) return

    try {
      await API.delete(`/beds/${selectedBed.ID}`)

      setDeleteVisible(false)
      setToastMessage('Bed deleted successfully!')
      setToastVisible(true)
      fetchBeds()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">


            {/* Title */}
            <h5 className="mb-0">Beds</h5>

            {/* Right Controls */}
            <div className="d-flex align-items-center gap-2">

              {/* Search */}
              <CFormInput
                placeholder="Search bed..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                size="sm"
                style={{ width: '200px' }}
              />

              {/* Page Size */}
              <CFormSelect
                size="sm"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value))
                  setCurrentPage(1)
                }}
                style={{ width: '90px' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </CFormSelect>                  

              {/* Add Button */}
              <CButton
                color="primary"
                size="sm"
                onClick={() => setVisible(true)}
              >
                Add Bed
              </CButton>
            </div>
          </div>
        </CCardHeader>

        <CCardBody>
          <BedTable
            beds={currentItems}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            sortOrder={sortOrder}
            onSortChange={() =>
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            }
          />
          <DataPagination
            totalItems={filteredBeds.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CCardBody>
      </CCard>

      {/* Add Modal */}
      <BedFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSave}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        loading={loading}
        rooms={rooms}
      />      

      {/* Edit Modal */}
      <BedEditModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onUpdate={handleEditSubmit}
        editData={editData}
        errors={errors}
        onChange={handleEditChange}
        loading={loading}
        rooms={rooms}
      />

      {/* Delete Modal */}
      <BedDeleteModal
        visible={deleteVisible}
        bed={selectedBed}
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

export default Beds