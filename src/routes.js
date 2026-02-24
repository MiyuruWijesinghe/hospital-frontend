import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Wards = React.lazy(() => import('./views/wards/Wards'))
const Rooms = React.lazy(() => import('./views/rooms/Rooms'))
const Beds = React.lazy(() => import('./views/beds/Beds'))
const Patients = React.lazy(() => import('./views/patients/Patients'))
const Admissions = React.lazy(() => import('./views/admissions/Admissions'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/wards', name: 'Wards', element: Wards },
  { path: '/rooms', name: 'Rooms', element: Rooms },
  { path: '/beds', name: 'Beds', element: Beds },
  { path: '/patients', name: 'Patients', element: Patients },
  { path: '/admissions', name: 'Admissions', element: Admissions },
]

export default routes