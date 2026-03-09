import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span>Hospital Bed Management System © 2026</span>
      </div>
      <div className="ms-auto">
        <span>Version 1.0</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
