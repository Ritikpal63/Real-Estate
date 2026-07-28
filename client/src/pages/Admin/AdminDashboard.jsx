import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const AdminDashboardStats = () => {
  const [countNews, setCountNews] = useState()
  // const [countContact, setCountContact] = useState()
  const getDetails = async () =>{
    try {
      const newsCount = await axiosInstance.get('/news/allnews')
      // const contactCount = await axiosInstance.get('/contact')
      setCountNews(newsCount.data.pagination.total)
      // setCountContact(contactCount.data.pagination.total)
    } catch (error) {
      console.log("Dashboard: ", error.message)
    }
  }
  useEffect(()=>{
    getDetails()
  },[])
  return (
    <>
    <div className='dashboard-stats bg-light p-3 rounded shadow-sm d-flex flex-column align-items-center justify-content-center w-35'>
     <p className='text-lg font-semibold'>Total News</p>
     <p>{countNews}</p>         
    </div>
    {/* <div>Total Contact: {countContact}</div> */}
    </>
  )
}

export default AdminDashboardStats