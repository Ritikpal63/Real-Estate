import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const AdminDashboardStats = () => {
  const [countNews, setCountNews] = useState()
  const getDetails = async () =>{
    try {
      const res = await axiosInstance.get('/news/allnews')
      setCountNews(res.data.data)
      console.log("Count News: ",countNews.total)
    } catch (error) {
      console.log("Dashboard: ", error)
    }
  }
  useEffect(()=>{
    getDetails()
  },[])
  return (
    <div>AdminDashboardStats: {countNews}</div>
  )
}

export default AdminDashboardStats