import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	const [open, setOpen] = useState(false)

	const toggleMenu = (e) => {
		e.preventDefault()
		setOpen((v) => !v)
	}

	const closeMenu = () => setOpen(false)

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
								<Link to="/"  className='nav-link text-light hover:text-green-500'>Home</Link>
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
					<a href="#" onClick={toggleMenu} className="site-menu-toggle js-menu-toggle float-right" aria-expanded={open} aria-controls="mobile-menu"><span
						className="icon-menu h3"></span></a>
				</div>

				{/* Mobile menu */}
				<div id="mobile-menu" className="d-xl-none" style={{display: open ? 'block' : 'none'}}>
					<nav className="site-navigation text-center" role="navigation">
						<ul className="site-menu main-menu">
							<li><Link to="/" onClick={closeMenu} className='nav-link text-light'>Home</Link></li>
							<li><Link to="about" onClick={closeMenu} className="nav-link text-light">about</Link></li>
							<li className="has-children">
								<Link to="property" onClick={closeMenu} className="nav-link text-light">Property</Link>
								<ul className="dropdown">
									<li><Link to="property-details" onClick={closeMenu} className="nav-link">Property Details</Link></li>
								</ul>
							</li>
							<li><Link to="gallery" onClick={closeMenu} className='text-light'>Gallery</Link></li>
							<li className="has-children">
								<Link to="#" onClick={(e) => e.preventDefault()} className="nav-link text-light">Pages</Link>
								<ul className="dropdown">
									<li><Link to="agent-profile" onClick={closeMenu} className="nav-link">agent profile</Link></li>
									<li><Link to="register" onClick={closeMenu} className="nav-link">register page</Link></li>
									<li><Link to="faq" onClick={closeMenu} className="nav-link">Faqs</Link></li>
									<li><Link to="pagenotfound" onClick={closeMenu} className="nav-link">404 page</Link></li>
								</ul>
							</li>
							<li className="has-children">
								<Link to="blog" onClick={closeMenu} className="nav-link text-light">Blog</Link>
								<ul className="dropdown">
									<li><Link to="blogpost" onClick={closeMenu} className="nav-link">Blog Post</Link></li>
								</ul>
							</li>
							<li><Link className="nav-link text-light" to="contact" onClick={closeMenu}>Contact</Link></li>
							<li><Link className='nav-link text-light' to='/admin' onClick={closeMenu}>Admin</Link></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</header>
    </>
  )
}

export default Navbar


// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   const toggleMenu = (e) => {
//     e.preventDefault();
//     setOpen((v) => !v);
//   };

//   const closeMenu = () => setOpen(false);

//   	const [openDropdown, setOpenDropdown] = useState(null);
//   //   const [open, setOpen] = useState(false); // For mobile menu

//   //   const toggleDropdown = (menu) => {
//   //     setOpenDropdown(openDropdown === menu ? null : menu);
//   //   };

//   //   const closeMenu = () => {
//   //     setOpen(false);
//   //     setOpenDropdown(null);
//   //   };

//   return (
//     <>
//       {/* <nav className="link navbar">
//   <div className="link container">
//     <div className="link logo"><i className="link fas fa-building" style={{color:"#60a5fa", marginRight:"6px"}}></i>NCR<span>Space</span>Connect</div>
//     <div className="link nav-links">
//       <Link to="/" className="link active">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/services">Services</Link>
//       <Link to="/office-space">Office Space</Link>
//       <Link to="/jobs">Jobs</Link>
//       <Link to="/news">News</Link>
//       <Link to="/contact">Contact</Link>
//     </div>
//   </div>
// </nav> */}
//       <header
//         className="link site-navbar py-3 js-sticky-header site-navbar-target border-b border-white/20"
//         role="banner"
//       >
//         <div className="link container mx-auto px-4">
//           <div className="link flex items-center justify-between">
//             {/* Logo - Left */}
//             <div className="link flex items-center w-1/6 xl:w-auto">
//               <h1 className="link mb-0 site-logo">
//                 <Link to="/">
//                   <img
//                     src="/assets/img/ncrlogowithoutbg.png"
//                     alt=""
//                     className="link w-20"
//                   />
//                 </Link>
//               </h1>
//             </div>

//             {/* Desktop Navigation - Center/Right */}
//             <div className="link hidden xl:block flex-1">
//               <nav className="link site-navigation text-right" role="navigation">
//                 <ul className="link site-menu main-menu js-clone-nav mr-auto hidden lg:flex lg:items-center lg:justify-end space-x-6">
//                   <li>
//                     <Link
//                       to="/"
//                       className="link nav-link text-light hover:text-green-500 transition-colors duration-300"
//                     >
//                       Home
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="about"
//                       className="link nav-link text-light hover:text-green-500 transition-colors duration-300"
//                     >
//                       About
//                     </Link>
//                   </li>
//                   <li className="link has-children relative group">
//                     <Link
//                       to="property"
//                       className="link nav-link text-light hover:text-green-500 transition-colors duration-300"
//                     >
//                       Property
//                     </Link>
//                     <ul className="link dropdown absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
//                       <li>
//                         <Link
//                           to="property-details"
//                           className="link nav-link block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         >
//                           Property Details
//                         </Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <Link
//                       to="gallery"
//                       className="link text-light hover:text-green-500 transition-colors duration-300"
//                     >
//                       Gallery
//                     </Link>
//                   </li>
//                   <li className="link has-children relative">
//                     <button
//                       onClick={() => toggleDropdown("pages")}
//                       className="link w-full text-left nav-link text-light hover:text-green-500 transition-colors duration-300 block flex items-center justify-between"
//                     >
//                       <span>Pages</span>
//                       <svg
//                         className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "pages" ? "rotate-180" : ""}`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>

//                     <ul
//                       className={`dropdown space-y-2 py-2 pl-4 transition-all duration-300 overflow-hidden ${openDropdown === "pages" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
//                     >
//                       <li>
//                         <Link
//                           to="agent-profile"
//                           onClick={closeMenu}
//                           className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                         >
//                           Agent Profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="register"
//                           onClick={closeMenu}
//                           className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                         >
//                           Register Page
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="faq"
//                           onClick={closeMenu}
//                           className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                         >
//                           FAQs
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="pagenotfound"
//                           onClick={closeMenu}
//                           className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                         >
//                           404 Page
//                         </Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li className="link has-children relative group">
//                     <Link
//                       to="blog"
//                       className="link nav-link text-light hover:text-green-500 transition-colors duration-300"
//                     >
//                       Blog
//                     </Link>
//                     <ul className="link dropdown absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
//                       <li>
//                         <Link
//                           to="blogpost"
//                           className="link nav-link block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         >
//                           Blog Post
//                         </Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <Link
//                       to="contact"
//                       className="link nav-link text-light hover:text-green-500 transition-colors duration-300"
//                     >
//                       Contact
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/admin"
//                       className="link nav-link text-light hover:text-green-500 transition-colors duration-300"
//                     >
//                       Admin
//                     </Link>
//                   </li>
//                 </ul>
//               </nav>
//             </div>

//             {/* Mobile Menu Toggle Button */}
//             <div className="link xl:hidden flex items-center py-3">
//               <button
//                 onClick={toggleMenu}
//                 className="link site-menu-toggle js-menu-toggle float-right"
//                 aria-expanded={open}
//                 aria-controls="mobile-menu"
//               >
//                 <span className="link icon-menu h3"></span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           <div
//             id="mobile-menu"
//             className="link xl:hidden"
//             style={{ display: open ? "block" : "none" }}
//           >
//             <nav className="link site-navigation text-center" role="navigation">
//               <ul className="link site-menu main-menu space-y-3 py-4">
//                 <li>
//                   <Link
//                     to="/"
//                     onClick={closeMenu}
//                     className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="about"
//                     onClick={closeMenu}
//                     className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                   >
//                     About
//                   </Link>
//                 </li>
//                 <li className="link has-children">
//                   <Link
//                     to="property"
//                     onClick={closeMenu}
//                     className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                   >
//                     Property
//                   </Link>
//                   <ul className="link dropdown space-y-2 py-2">
//                     <li>
//                       <Link
//                         to="property-details"
//                         onClick={closeMenu}
//                         className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                       >
//                         Property Details
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <Link
//                     to="gallery"
//                     onClick={closeMenu}
//                     className="link text-light hover:text-green-500 transition-colors duration-300 block"
//                   >
//                     Gallery
//                   </Link>
//                 </li>
//                 <li className="link has-children relative">
//                   <button
//                     onClick={() => toggleDropdown("pages")}
//                     className="link w-full text-left nav-link text-light hover:text-green-500 transition-colors duration-300 block flex items-center justify-between"
//                   >
//                     <span>Pages</span>
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "pages" ? "rotate-180" : ""}`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   <ul
//                     className={`dropdown space-y-2 py-2 pl-4 transition-all duration-300 overflow-hidden ${openDropdown === "pages" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
//                   >
//                     <li>
//                       <Link
//                         to="agent-profile"
//                         onClick={closeMenu}
//                         className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                       >
//                         Agent Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="register"
//                         onClick={closeMenu}
//                         className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                       >
//                         Register Page
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="faq"
//                         onClick={closeMenu}
//                         className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                       >
//                         FAQs
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="pagenotfound"
//                         onClick={closeMenu}
//                         className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                       >
//                         404 Page
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>
//                 <li className="link has-children">
//                   <Link
//                     to="blog"
//                     onClick={closeMenu}
//                     className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                   >
//                     Blog
//                   </Link>
//                   <ul className="link dropdown space-y-2 py-2">
//                     <li>
//                       <Link
//                         to="blogpost"
//                         onClick={closeMenu}
//                         className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                       >
//                         Blog Post
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <Link
//                     to="contact"
//                     onClick={closeMenu}
//                     className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin"
//                     onClick={closeMenu}
//                     className="link nav-link text-light hover:text-green-500 transition-colors duration-300 block"
//                   >
//                     Admin
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;
