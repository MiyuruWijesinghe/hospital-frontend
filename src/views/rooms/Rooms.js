import React, { useEffect, useState, useMemo } from 'react'
import API from '../../services/api'
import RoomTable from './RoomTable'
import RoomFormModal from './RoomFormModal'
import RoomEditModal from './RoomEditModal'
import RoomDeleteModal from './RoomDeleteModal'
import { validateRoom } from './roomValidation'
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

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [wards, setWards] = useState([])

  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const [formData, setFormData] = useState({ 
    wardID: '', 
    roomNumber: '', 
    roomType: 'PRIVATE' 
  })

  const [editData, setEditData] = useState({
    id: null,
    wardID: '', 
    roomNumber: '', 
    roomType: 'PRIVATE'
  })

  const [selectedRoom, setSelectedRoom] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    fetchRooms()
    fetchWards()
  }, [])

  const fetchRooms = async () => {
    try {
      const res = await API.get('/rooms')
      setRooms(res.data)  
    } catch (err) {
      console.error(err)
    }
  }

  const fetchWards = async () => {
    try {
      const res = await API.get('/wards')
      setWards(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((room) => {
        const term = searchTerm.toLowerCase()

        return (
          room.Ward.Name?.toLowerCase().includes(term) ||
          room.RoomNumber?.toLowerCase().includes(term) ||
          room.RoomType?.toLowerCase().includes(term)
        )
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.RoomNumber.localeCompare(b.RoomNumber)
        }
        return b.RoomNumber.localeCompare(a.RoomNumber)
      })
  }, [rooms, searchTerm, sortOrder])

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage
    const first = last - itemsPerPage
    return filteredRooms.slice(first, last)
  }, [filteredRooms, currentPage, itemsPerPage])


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
    const validationErrors = validateRoom(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.post('/rooms', {
        ...formData,
        wardID: parseInt(formData.wardID),
      })

      setVisible(false)
      setFormData({ wardID: '', roomNumber: '', roomType: 'PRIVATE' })
      setErrors({})
      setToastMessage('Room created successfully!')
      setToastVisible(true)
      fetchRooms()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // EDIT HANDLERS
  // ======================

  const handleEditClick = (room) => {
    setEditData({
      id: room.ID,
      wardID: room.WardID,
      roomNumber: room.RoomNumber,
      roomType: room.RoomType,
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
    const validationErrors = validateRoom(editData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.put(`/rooms/${editData.id}`, {
        wardID: parseInt(editData.wardID),
        roomNumber: editData.roomNumber,
        roomType: editData.roomType,
      })

      setEditVisible(false)
      setToastMessage('Room updated successfully!')
      setToastVisible(true)
      fetchRooms()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // DELETE HANDLERS
  // ======================

  const handleDeleteClick = (room) => {
    setSelectedRoom(room)
    setDeleteVisible(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedRoom) return

    try {
      await API.delete(`/rooms/${selectedRoom.ID}`)

      setDeleteVisible(false)
      setToastMessage('Room deleted successfully!')
      setToastVisible(true)
      fetchRooms()
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
            <h5 className="mb-0">Rooms</h5>
            
            {/* Right Controls */}
            <div className="d-flex align-items-center gap-2">

              {/* Search */}
              <CFormInput
                placeholder="Search room..."
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
                Add Room
              </CButton>
            </div>
          </div>
        </CCardHeader>

        <CCardBody>
          <RoomTable
            rooms={currentItems}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            sortOrder={sortOrder}
            onSortChange={() =>
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            }
          />
          <DataPagination
            totalItems={filteredRooms.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CCardBody>
      </CCard>

      {/* Add Modal */}
      <RoomFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSave}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        loading={loading}
        wards={wards}
      />      

      {/* Edit Modal */}
      <RoomEditModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onUpdate={handleEditSubmit}
        editData={editData}
        errors={errors}
        onChange={handleEditChange}
        loading={loading}
        wards={wards}
      />

      {/* Delete Modal */}
      <RoomDeleteModal
        visible={deleteVisible}
        room={selectedRoom}
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

export default Rooms