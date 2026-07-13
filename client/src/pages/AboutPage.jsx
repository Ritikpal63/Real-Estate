import React from 'react'
import Section from '../components/Section'
import Team from '../components/Team'
import { Link } from 'react-router-dom'
import About from '../components/About'

const AboutPage = () => {
  return (
    <>
    <Section title={"About"} sectionpara={""} classPara={"text-light text-start"}/>
	<About />
   {/* <div class="stats mx-5">
      <div class="stat-item">
        <div class="number">500+</div>
        <div class="label">Properties Listed</div>
      </div>
      <div class="stat-item">
        <div class="number">200+</div>
        <div class="label">Happy Clients</div>
      </div>
      <div class="stat-item">
        <div class="number">50+</div>
        <div class="label">Partner Developers</div>
      </div>
      <div class="stat-item">
        <div class="number">1000+</div>
        <div class="label">Job Seekers Connected</div>
      </div>
    </div> */}
    <Team />
    </>
  )
}

export default AboutPage