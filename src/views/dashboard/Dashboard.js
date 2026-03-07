import React, { useEffect, useState } from 'react'
import API from '../../services/api'

import DashboardCards from './DashboardCards'
import RecentAdmissions from './RecentAdmissions'

import {
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'


const Dashboard = () => {

  const [stats, setStats] = useState({})
  const [recentAdmissions, setRecentAdmissions] = useState([])

  useEffect(() => {
    fetchStats()
    fetchRecentAdmissions()
  }, [])

  const fetchStats = async () => {
    const res = await API.get("/dashboard")
    setStats(res.data.hospitalSummary)
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