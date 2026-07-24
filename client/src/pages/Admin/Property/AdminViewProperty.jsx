import React from 'react'
import Section from '../../../components/Section'
import AdminAsideSection from '../AdminAsideSection'

const AdminViewProperty = () => {
  return (
    <>
    <Section title={"View Property"}/>
    <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
        </div>
      </div>
    </>
  )
}

export default AdminViewProperty