import React from 'react'
import { Link } from 'react-router-dom'

const Latestnews = () => {
  return (
    <>
    <section id="blog" className="fresh-news section-padding">
		<div className="container">
			<div className="section-title text-center">
				<h2>Latest News</h2>
				<div></div>
			</div>
			<div className="row">
				<div className="col-lg-4 col-sm-4 col-xs-12">
					<div className="single_blog">
						<div className="blog_img">
							<Link href="blog.html"><img src="assets/img/blog/blog-1.jpg" className="img-fluid"
									alt="image" /></Link>
							<div className="post-date">
								<span className="date">15</span>
								<span className="month">Sep</span>
							</div>
						</div>
						<div className="blog_content">
							<h3><Link href="blog.html">Team you want to work with mistake runners</Link></h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
								venenatis dignissim.</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-sm-4 col-xs-12">
					<div className="single_blog">
						<div className="blog_img">
							<Link href="blog.html"><img src="assets/img/blog/blog-2.jpg" className="img-fluid"
									alt="image" /></Link>
							<div className="post-date">
								<span className="date">16</span>
								<span className="month">Sep</span>
							</div>
						</div>
						<div className="blog_content">
							<h3><Link href="blog.html">Lights winged seasons fish abundantly evening</Link></h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
								venenatis dignissim.</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-sm-4 col-xs-12">
					<div className="single_blog">
						<div className="blog_img">
							<Link href="blog.html"><img src="assets/img/blog/blog-3.jpg" className="img-fluid"
									alt="image" /></Link>
							<div className="post-date">
								<span className="date">17</span>
								<span className="month">Sep</span>
							</div>
						</div>
						<div className="blog_content">
							<h3><Link href="blog.html">Winged moved stars, food creature seed night</Link></h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
								venenatis dignissim.</p>
						</div>
					</div>
				</div>
                			</div>
		</div>
	</section>
    </>
  )
}

export default Latestnews