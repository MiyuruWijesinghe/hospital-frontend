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
  CFormSelect
} from '@coreui/react'

const Wards = () => {
  const [wards, setWards] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

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
    if (!formData.name || !formData.type || !formData.floor) {
      alert('Please fill all fields')
      return
    }

    try {
      setLoading(true)

      await API.post('/wards', {
        name: formData.name,
        type: formData.type,
        floor: parseInt(formData.floor),
      })

      setVisible(false)
      setFormData({ name: '', type: '', floor: '' })
      fetchWards()
    } catch (err) {
      console.error(err)
      alert('Error creating ward')
    } finally {
      setLoading(false)
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
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {wards.map((ward) => (
                <CTableRow key={ward.ID}>
                  <CTableDataCell>{ward.Name}</CTableDataCell>
                  <CTableDataCell>{ward.Type}</CTableDataCell>
                  <CTableDataCell>{ward.Floor}</CTableDataCell>
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
              />
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
              />
            </div>
          </CForm>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>

          <CButton color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Save'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Wards