import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
	{/* <nav className="navbar">
  <div className="container">
    <div className="logo"><i className="fas fa-building" style={{color:"#60a5fa", marginRight:"6px"}}></i>NCR<span>Space</span>Connect</div>
    <div className="nav-links">
      <Link to="/" className="active">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/office-space">Office Space</Link>
      <Link to="/jobs">Jobs</Link>
      <Link to="/news">News</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </div>
</nav> */}
    	<header className="site-navbar py-3 js-sticky-header site-navbar-target" role="banner" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)'}}>
		<div className="container">
			<div className="row align-items-center">
				<div className="col-6 col-xl-2">
					<h1 className="mb-0 site-logo"><Link to="/"><img src="/assets/img/ncrlogowithoutbg.png" alt="" style={{width:"80px"}}/></Link></h1>
				</div>
				<div className="col-12 col-md-10 d-none d-xl-block">
					<nav className="site-navigation position-relative text-right" role="navigation">
						<ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
							<li>
								<Link to="/"  className='nav-link text-light'>Home</Link>
							</li>
							<li><Link className="nav-link text-light" to="about">about</Link></li>
							<li className="has-children">
								<Link to="property" className="nav-link text-light">Property</Link>
								<ul className="dropdown">
									<li><Link to="property-details" className="nav-link">Property Details</Link></li>
								</ul>
							</li>
							<li><Link to="gallery" className='text-light'>Gallery</Link></li>
							<li className="has-children">
								<Link to="#" className="nav-link text-light">Pages</Link>
								<ul className="dropdown">
									<li><Link to="agent-profile" className="nav-link">agent profile</Link></li>
									{/* <li><Link to="login" className="nav-link textx-light">login page</Link></li> */}
									<li><Link to="register" className="nav-link">register page</Link></li>
									<li><Link to="faq" className="nav-link">Faqs</Link></li>
									<li><Link to="pagenotfound" className="nav-link">404 page</Link></li>
								</ul>
							</li>
							<li className="has-children">
								<Link to="blog" className="nav-link text-light">Blog</Link>
								<ul className="dropdown">
									<li><Link to="blogpost" className="nav-link">Blog Post</Link></li>
								</ul>
							</li>
							<li><Link className="nav-link text-light" to="contact">Contact</Link></li>
							<li><Link className='nav-link text-light' to='/admin'>Admin</Link></li>
						</ul>
					</nav>
				</div>
				<div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{position: "relative", top: "3px"}}>
					<Link to="#" className="site-menu-toggle js-menu-toggle float-right"><span
							className="icon-menu h3"></span></Link>
				</div>
			</div>
		</div>
	</header>
    </>
  )
}

export default Navbar