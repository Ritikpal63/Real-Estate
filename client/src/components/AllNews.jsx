import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosConfig'

const AllNews = () => {
    const [news, setNews] = useState([])
    useEffect(()=>{
        const getAllNews = async () =>{
            try {
                const res = await axiosInstance.get('/news/allnews')
                console.log(res.data.data)
                setNews(res.data.data)
            } catch (error) {
                console.log("All News Error", error)
            }
        };
        getAllNews();
    },[])
  return (
    <>
    <h1>All News Page
        {news?.map((item)=>{
            return <div key={item.id}>
                <p>Title: {item.title}</p>
            </div>
        })}
    </h1>
    </>
  )
}

export default AllNews