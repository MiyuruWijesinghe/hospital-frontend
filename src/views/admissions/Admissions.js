import React, { useEffect, useState, useMemo } from 'react'
import API from '../../services/api'

import AdmissionTable from './AdmissionTable'
import AdmitPatientModal from './AdmitPatientModal'
import AdmissionDetailsModal from './AdmissionDetailsModal'
import DataPagination from '../../components/common/DataPagination'
import { validateAdmission } from './admissionValidation'

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

const Admissions = () => {
  const [admissions, setAdmissions] = useState([])
  const [patients, setPatients] = useState([])
  const [beds, setBeds] = useState([])

  const [visible, setVisible] = useState(false)

  const [formData, setFormData] = useState({
    patientId: '',
    bedId: '',
    reason: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [detailsVisible, setDetailsVisible] = useState(false)
  const [selectedAdmission, setSelectedAdmission] = useState(null)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    fetchAdmissions()
    fetchPatients()
    fetchBeds()
  }, [])

  const fetchAdmissions = async () => {
    try {
      const res = await API.get("/admissions")
      setAdmissions(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients")
      setPatients(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBeds = async () => {
    try {
      const res = await API.get("/beds/status/AVAILABLE")
      setBeds(res.data)
    } catch (error) {
      console.error(error)  
    }
  }

  const filteredAdmits = useMemo(() => {
    return admissions
      .filter((admit) => {
        const term = searchTerm.toLowerCase()

        return (
          admit.Patient.FirstName?.toLowerCase().includes(term) ||
          admit.Patient.LastName?.toLowerCase().includes(term) ||
          admit.Bed.Room.Ward.Name?.toLowerCase().includes(term) ||
          admit.Bed.Room.RoomNumber?.toLowerCase().includes(term) ||
          admit.Bed.BedNumber?.toLowerCase().includes(term) ||
          admit.Status?.toLowerCase().includes(term)
        )
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.Patient.FirstName.localeCompare(b.Patient.FirstName)
        }
        return b.Patient.FirstName.localeCompare(a.Patient.FirstName)
      })
  }, [admissions, searchTerm, sortOrder])

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage
    const first = last - itemsPerPage
    return filteredAdmits.slice(first, last)
  }, [filteredAdmits, currentPage, itemsPerPage])

  // ======================
  // ADMIT HANDLERS
  // ======================

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleSave = async () => {
    const validationErrors = validateAdmission(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)

      await API.post('/admissions/admit', {
        ...formData,
        patientId: parseInt(formData.patientId),
        bedId: parseInt(formData.bedId),
      })

      setVisible(false)
      setErrors({})
      setToastMessage('Admission created successfully!')
      setToastVisible(true)
      fetchAdmissions()
    } catch (error) {
      console.error(error)

      setToastMessage(error?.response?.data?.error || "Failed to admit patient")
      setToastVisible(true)

    } finally {
      setLoading(false)
    }
  }

  // ======================
  // DISCHARGE HANDLERS
  // ======================

  const handleViewAdmission = (admission) => {
    setSelectedAdmission(admission)
    setDetailsVisible(true)
  }

  const confirmDischarge = async () => {

    if (!selectedAdmission) return

    try {
      setLoading(true)

      await API.put(`/admissions/discharge/${selectedAdmission.ID}`)

      setDetailsVisible(false)
      setSelectedAdmission(null)

      setErrors({})
      setToastMessage('Admission discharged successfully!')
      setToastVisible(true)

      fetchAdmissions()
    } catch (error) {
      console.error(error)

      setToastMessage(error?.response?.data?.error || "Failed to discharge patient")
      setToastVisible(true)

    } finally {
      setLoading(false)  
    }    
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            
            {/* Title */}
            <h5 className="mb-0">Admissions</h5>

            {/* Right Controls */}
            <div className="d-flex align-items-center gap-2">

              {/* Search */}
              <CFormInput
                placeholder="Search admission..."
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
                Admit Patient
              </CButton>
            </div>
          </div>
        </CCardHeader>

        <CCardBody>
          <AdmissionTable
            admissions={currentItems}
            onView={handleViewAdmission}
            sortOrder={sortOrder}
            onSortChange={() =>
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            }
          />
          <DataPagination
            totalItems={filteredAdmits.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CCardBody>
      </CCard>

      {/* Admit Patient Modal */}          
      <AdmitPatientModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSave}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        loading={loading}
        patients={patients}
        beds={beds}
      />

      {/* Admission Details Modal */}
      <AdmissionDetailsModal
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        admission={selectedAdmission}
        onDischarge={confirmDischarge}
        loading={loading}
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

export default Admissions