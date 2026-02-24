import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilHospital,
  cilDoor,
  cilBed,
  cilUser,
  cilNotes,
} from '@coreui/icons'

const _nav = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: 'CNavItem',
    name: 'Wards',
    to: '/wards',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
  },
  {
    component: 'CNavItem',
    name: 'Rooms',
    to: '/rooms',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" />,
  },
  {
    component: 'CNavItem',
    name: 'Beds',
    to: '/beds',
    icon: <CIcon icon={cilBed} customClassName="nav-icon" />,
  },
  {
    component: 'CNavItem',
    name: 'Patients',
    to: '/patients',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: 'CNavItem',
    name: 'Admissions',
    to: '/admissions',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav