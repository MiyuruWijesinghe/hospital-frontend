import React, { useEffect, useState } from 'react'
import API from '../../services/api'

import DashboardCards from './DashboardCards'
import BedOccupancyMap from '../beds/BedOccupancyMap'
import RecentAdmissions from './RecentAdmissions'

import {
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'


const Dashboard = () => {

  const [stats, setStats] = useState({})
  const [rooms, setRooms] = useState([])
  const [recentAdmissions, setRecentAdmissions] = useState([])

  useEffect(() => {
    fetchStats()
    fetchRooms()
    fetchRecentAdmissions()
  }, [])

  const fetchStats = async () => {
    const res = await API.get("/dashboard")
    setStats(res.data.hospitalSummary)
  }

  const fetchRooms = async () => {
    const res = await API.get("/rooms")
    setRooms(res.data)
  }

  const fetchRecentAdmissions = async () => {
    const res = await API.get("/admissions")
    setRecentAdmissions(res.data.slice(0,5))
  }

  if (!stats) return <p>Loading dashboard...</p>

  return (
    <>
      <DashboardCards stats={stats} />
      
      <CCard className="mt-3">
        <CCardHeader>
          Bed Occupancy Map
        </CCardHeader>

        <CCardBody>
          <BedOccupancyMap rooms={rooms} />
        </CCardBody>
      </CCard>

      <CCard className="mt-3">

        <CCardHeader>
          Recent Admissions
        </CCardHeader>

        <CCardBody>
          <RecentAdmissions admissions={recentAdmissions} />
        </CCardBody>

      </CCard>
    </>
  )
}

export default Dashboard