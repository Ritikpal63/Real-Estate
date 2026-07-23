import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const AdminDashboardStats = () => {
  const [countNews, setCountNews] = useState()
  const [countContact, setCountContact] = useState()
  const getDetails = async () =>{
    try {
      const newsCount = await axiosInstance.get('/news/allnews')
      const contactCount = await axiosInstance.get('/contact')
      setCountNews(newsCount.data.pagination.total)
      setCountContact(contactCount.data.pagination.total)
    } catch (error) {
      console.log("Dashboard: ", error)
    }
  }
  useEffect(()=>{
    getDetails()
  },[])
  return (
    <>
    <div>Total News:  {countNews}</div>
    <div>Total Contact: {countContact}</div>
    </>
  )
}

export default AdminDashboardStats