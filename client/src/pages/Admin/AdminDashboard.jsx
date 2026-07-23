import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const AdminDashboardStats = () => {
  const [countNews, setCountNews] = useState()
  const getDetails = async () =>{
    try {
      const res = await axiosInstance.get('/news/allnews')
      setCountNews(res.data.data.total)
      console.log("Count News: ",countNews)
    } catch (error) {
      console.log("Dashboard: ", error)
    }
  }
  useEffect(()=>{
    getDetails()
  },[])
  return (
    <div>AdminDashboardStats</div>
  )
}

export default AdminDashboardStats