import React from 'react'
import Section from '../components/Section'
import Blogpost from '../components/Blogpost'
import AdminAsideSection from './Admin/AdminAsideSection'


const BlogpostPage = () => {
  return (
    <>
	<Section title={"Blog Post"} />
  <Blogpost />
    </>
  )
}

export default BlogpostPage