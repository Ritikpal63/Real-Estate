import React from 'react'
import AdminAsideSection from '../AdminAsideSection'
import Section from '../../../components/Section'

const AddGallery = () => {
  return (
     <>
    <Section title={"Add Gallery"} />
        <div className="flex flex-col lg:flex-row">
          <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
          Add Gallery Item
        </div>
      </div>
    </>
  )
}

export default AddGallery