import React from "react"
import { CRow, CCol, CCard, CCardBody } from "@coreui/react"

const DashboardCards = ({ stats }) => {

  const cards = [
    { title: "Total Wards", value: stats.TotalWards },
    { title: "Total Rooms", value: stats.TotalRooms },
    { title: "Total Beds", value: stats.TotalBeds },
    { title: "Active Admissions", value: stats.ActiveAdmissions },
    { title: "Available Beds", value: stats.AvailableBeds },
    { title: "Occupied Beds", value: stats.OccupiedBeds },
    { title: "Cleaning Beds", value: stats.CleaningBeds },
  ]

  return (
    <CRow>
      {cards.map((card, index) => (
        <CCol md={3} key={index} className="mb-3">

          <CCard>
            <CCardBody>

              <div className="text-medium-emphasis small">
                {card.title}
              </div>

              <h4>{card.value}</h4>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

export default DashboardCards