import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <>
    	<footer className="footer-area">
		<div className="container">
			<div className="row">
				<div className="col-lg-12 text-center">
					<div className="footer_social">
						<ul>
							<li><Link data-toggle="tooltip" data-placement="top" title="Facebook" href="#"><i
										className="fa fa-facebook"></i></Link>
							</li>
							<li><Link data-toggle="tooltip" data-placement="top" title="Twitter" href="#"><i
										className="fa fa-instagram"></i></Link>
							</li>
							<li><Link data-toggle="tooltip" data-placement="top" title="Google Plus" href="#"><i
										className="fa fa-google-plus"></i></Link>
							</li>
							<li><Link data-toggle="tooltip" data-placement="top" title="Linkedin" href="#"><i
										className="fa fa-linkedin"></i></Link>
							</li>
							<li><Link data-toggle="tooltip" data-placement="top" title="Youtube" href="#"><i
										className="fa fa-youtube"></i></Link>
							</li>
							<li><Link data-toggle="tooltip" data-placement="top" title="Skype" href="#"><i
										className="fa fa-skype"></i></Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="row footer-padding">
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_footer">
						<h4>Contact Us</h4>
						<div className="footer_contact">
							<ul>
								<li><i className="fa fa-rocket"></i> <span>D 80 Vypaar Marg Sector 2 Noida 201301</span></li>
								<li><i className="fa fa-phone"></i> <span>Call Us - (+91) 9911819708</span></li>
								<li><i className="fa fa-fax"></i> <span>Landline - 0120-4656339</span></li>
								<li><i className="fa fa-envelope"></i> <span>info@ncrspaceconnect.com</span></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_footer">
						<h4>Customer service</h4>
						<div className="footer_contact">
							<ul>
								<li><Link href="#">My Account</Link></li>
								<li><Link href="#">Order History</Link></li>
								<li><Link href="#">FAQ</Link></li>
								<li><Link href="#">Specials</Link></li>
								<li><Link href="#">Help Center</Link></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_footer">
						<h4>Helpful Link</h4>
						<div className="footer_contact">
							<ul>
								<li><Link href="#">About us</Link></li>
								<li><Link href="#">Customer Service</Link></li>
								<li><Link href="#">Company</Link></li>
								<li><Link href="#">Investor Relations</Link></li>
								<li><Link href="#">Advanced Search</Link></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_footer">
						<h4>Why choose Us</h4>
						<div className="footer_contact">
							<ul>
								<li><Link href="#">Shopping Guide</Link></li>
								<li><Link href="#">Blog</Link></li>
								<li><Link href="#">Company</Link></li>
								<li><Link href="#">Investor Relations</Link></li>
								<li><Link href="contact.html">Contact Us</Link></li>
							</ul>
						</div>
					</div>
				</div>
		</div>
        </div>
	</footer>
    </>
  )
}

export default Footer