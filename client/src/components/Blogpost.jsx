import React from 'react'
import { Link } from 'react-router-dom'


const Blogpost = () => {
  return (
    <>
    <section className="blog_post section-padding">
		<div className="container">
			<div className="row">
				<div className="col-md-8 col-sm-12 col-xs-12">
					<div className="blog_post_left">
						<div className="home_blog_img">
							<img src="assets/img/blog/blog-1.jpg" className="img-fluid" alt="" />
						</div>
						<div className="home_blog blog-post-blog">
							<div className="single_blog_content">
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy text ever since the 1500s, when an
									unknown printer took a galley of type and scrambled it to make a type specimen
									book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.
									Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
									an unknown printer took a galley of type and scrambled it to make a type specimen
									book.
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy text ever since the 1500s, when an
									unknown printer took a galley of type and scrambled it to make a type specimen book.
								</p>
							</div>
						</div>
					</div>
					<div className="comments_part">
						<h3 className="blog_head_title">Comments</h3>
						<div className="single_comment">
							<img src="assets/img/blog/c1.jpg" alt="" />
							<h4>Masum Billah</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies quam nisi,
								vel gravida enim accumsan id. Praesent justo quam, auctor et lorem in, pulvinar ornare
								orci. Duis dapibus urna purus, eget facilisis nisi tincidunt semper.</p>
						</div>
					</div>
					<div className="comment_form">
						<h3 className="blog_head_title">Add a Comment</h3>
						<form className="form" name="enq" method="post" >
							<div className="row">
								<div className="form-group col-md-6">
									<input type="text" name="name" className="form-control" id="first-name"
										placeholder="Name" required="required" />
								</div>
								<div className="form-group col-md-6">
									<input type="email" name="email" className="form-control" id="email" placeholder="Email"
										required="required" />
								</div>
								<div className="form-group col-md-12 mbnone">
									<textarea rows="6" name="message" className="form-control" id="description"
										placeholder="Your Message" required="required"></textarea>
								</div>
								<div className="col-md-12">
									<div className="actions">
										<input type="submit" value="Send message" name="submit" id="submitButton"
											className="btn btn-lg btn-blog-bg" title="Submit Your Message!" />
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="col-md-4 col-sm-12 col-xs-12">
					<div className="search wow fadeInRight">
						<input type="text" className="form-control" placeholder="Enter Keyword Here &amp; Search..." />
					</div>
					<div className="categories wow fadeInRight">
						<h4 className="blog_sidebar_title">Categories</h4>
						<ul>
							<li><Link to="#"><i className="fa fa-caret-right"></i> Apartment</Link></li>
							<li><Link to="#"><i className="fa fa-caret-right"></i> Condo</Link></li>
							<li><Link to="#"><i className="fa fa-caret-right"></i> Single Family Home</Link></li>
							<li><Link to="#"><i className="fa fa-caret-right"></i> Studio</Link></li>
							<li><Link to="#"><i className="fa fa-caret-right"></i> Villa</Link></li>
							<li><Link to="#"><i className="fa fa-caret-right"></i> Marketing</Link></li>
						</ul>
					</div>
					<div className="video_post wow fadeInRight">
						<h4 className="blog_sidebar_title">Video Widget</h4>
						<iframe src="https://player.vimeo.com/video/62026718"></iframe>
					</div>
					<div className="tag">
						<h4 className="blog_sidebar_title">Tag cloud</h4>
						<Link to="#">Apartment</Link>
						<Link to="#">Condo</Link>
						<Link to="#">Studio</Link>
						<Link to="#">All project</Link>
						<Link to="#">Villa</Link>
						<Link to="#">Marketing</Link>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default Blogpost