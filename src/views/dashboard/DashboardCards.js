import React from 'react'
import { CRow, CCol, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilHospital,
  cilDoor,
  cilBed,
  cilUser,
  cilCheckCircle,
  cilWarning
} from '@coreui/icons'

const DashboardCards = ({ stats }) => {

  const widgets = [
    {
      title: "Total Wards",
      value: stats.TotalWards,
      icon: cilHospital,
      color: "primary",
    },
    {
      title: "Total Rooms",
      value: stats.TotalRooms,
      icon: cilDoor,
      color: "info",
    },
    {
      title: "Total Beds",
      value: stats.TotalBeds,
      icon: cilBed,
      color: "primary",
    },
    {
      title: "Active Admissions",
      value: stats.ActiveAdmissions,
      icon: cilUser,
      color: "warning",
    },
    {
      title: "Available Beds",
      value: stats.AvailableBeds,
      icon: cilCheckCircle,
      color: "success",
    },
    {
      title: "Occupied Beds",
      value: stats.OccupiedBeds,
      icon: cilBed,
      color: "danger",
    },
    {
      title: "Cleaning Beds",
      value: stats.CleaningBeds,
      icon: cilWarning,
      color: "secondary",
    }
  ]

  return (
    <CRow>
      {widgets.map((w, index) => (

        <CCol sm={6} lg={3} key={index} className="mb-3">

          <CWidgetStatsF
            icon={<CIcon icon={w.icon} height={36} />}
            value={w.value ?? 0}
            title={w.title}
            color={w.color}
          />

        </CCol>
      ))}
    </CRow>
  )
}

export default DashboardCards