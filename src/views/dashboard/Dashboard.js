import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CRow,
  CCol,
} from '@coreui/react'
import API from '../../services/api'

const Dashboard = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    API.get('/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [])

  if (!data) return <p>Loading dashboard...</p>

  const summary = data.hospitalSummary

  return (
    <CRow>
      <CCol sm={3}>
        <CCard>
          <CCardBody>
            <CCardTitle>Total Beds</CCardTitle>
            <h3>{summary.TotalBeds}</h3>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={3}>
        <CCard color="success" textColor="white">
          <CCardBody>
            <CCardTitle>Available</CCardTitle>
            <h3>{summary.Available}</h3>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={3}>
        <CCard color="danger" textColor="white">
          <CCardBody>
            <CCardTitle>Occupied</CCardTitle>
            <h3>{summary.Occupied}</h3>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={3}>
        <CCard color="warning">
          <CCardBody>
            <CCardTitle>Cleaning</CCardTitle>
            <h3>{summary.Cleaning}</h3>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard