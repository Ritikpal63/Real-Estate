import React, { useEffect } from 'react'
import axiosInstance from '../utils/axiosConfig'

const AllNews = () => {
    useEffect(()=>{
        const getAllNews = async () =>{
            try {
                const res = await axiosInstance.get('/news/allnews')
                console.log(res.data.data)
            } catch (error) {
                console.log("All News Error", error)
            }
        };
        getAllNews();
    },[])
  return (
    <>
    <h1>All News Page</h1>
    </>
  )
}

export default AllNews