import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const AdminDashboardStats = () => {
  const [countNews, setCountNews] = useState()
  const getDetails = async () =>{
    try {
      const newsCount = await axiosInstance.get('/news/allnews')
      setCountNews(newsCount.data.pagination.total)
    } catch (error) {
      console.log("Dashboard: ", error)
    }
  }
  useEffect(()=>{
    getDetails()
  },[])
  return (
    <div>Total News:  {countNews}</div>
  )
}

export default AdminDashboardStats