import React, { useEffect, useState, useMemo } from "react"
import API from "../../services/api"

import PatientTable from "./PatientTable"
import PatientFormModal from "./PatientFormModal"
import PatientEditModal from "./PatientEditModal"
import PatientDeleteModal from "./PatientDeleteModal"
import { validatePatient } from "./patientValidation"
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

const Patients = () => {

  const [patients, setPatients] = useState([])

  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
  })

  const [editData, setEditData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
  })

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients")
      setPatients(res.data)  
    } catch (err) {
      console.error(err)
    }
  }

  const filteredPatients = useMemo(() => {
    return patients
      .filter((patient) => {
        const term = searchTerm.toLowerCase()

        return (
          patient.FullName?.toLowerCase().includes(term) ||
          patient.Gender?.toLowerCase().includes(term) ||
          patient.DOB?.toString().includes(term) ||
          patient.Age?.toString().includes(term) ||
          patient.AgeGroup?.toLowerCase().includes(term)
        )
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.FullName.localeCompare(b.FullName)
        }
        return b.FullName.localeCompare(a.FullName)
      })
  }, [patients, searchTerm, sortOrder])

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return filteredPatients.slice(indexOfFirstItem, indexOfLastItem)
  }, [filteredPatients, currentPage, itemsPerPage])

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
    const validationErrors = validatePatient(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.post("/patients", formData)

      setVisible(false)
      setFormData({ firstName: '', lastName: '', gender: 'Male', dob: '' })
      setErrors({})
      setToastMessage('Patient created successfully!')
      setToastVisible(true)
      fetchPatients()
    } catch (err) {
      console.error(err)  
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // EDIT HANDLERS
  // ======================

  const handleEditClick = (patient) => {
    setEditData({
      id: patient.ID,
      firstName: patient.FirstName,
      lastName: patient.LastName,
      gender: patient.Gender,
      dob: patient.DOB,
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
    const validationErrors = validatePatient(editData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.put(`/patients/${editData.id}`, {
        firstName: editData.firstName,
        lastName: editData.lastName,
        gender: editData.gender,
        dob: editData.dob,
      })

      setEditVisible(false)
      setToastMessage('Patient updated successfully!')
      setToastVisible(true)
      fetchPatients()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // DELETE HANDLERS
  // ======================

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient)
    setDeleteVisible(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedPatient) return

    try {
      await API.delete(`/patients/${selectedPatient.ID}`)

      setDeleteVisible(false)
      setToastMessage('Patient deleted successfully!')
      setToastVisible(true)
      fetchPatients()
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
            <h5 className="mb-0">Patients</h5>

            {/* Right Controls */}
            <div className="d-flex align-items-center gap-2">

              {/* Search */}
              <CFormInput
                placeholder="Search patient..."
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
                Add Patient
              </CButton>

            </div>
          </div>
        </CCardHeader>

        <CCardBody>
          <PatientTable
            patients={currentItems}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            sortOrder={sortOrder}
            onSortChange={() =>
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            }
          />
          <DataPagination
            totalItems={filteredPatients.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CCardBody>
      </CCard>

      {/* Add Modal */}
      <PatientFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSave}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        loading={loading}
      />

      {/* Edit Modal */}
      <PatientEditModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onUpdate={handleEditSubmit}
        editData={editData}
        errors={errors}
        onChange={handleEditChange}
        loading={loading}
      />

      {/* Delete Modal */}
      <PatientDeleteModal
        visible={deleteVisible}
        patient={selectedPatient}
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

export default Patients