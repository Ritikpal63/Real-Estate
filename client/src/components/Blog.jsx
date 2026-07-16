import React from 'react'
import { Link } from 'react-router-dom'
import { usePost } from "../contextApi/PostContext";

   

const Blog = () => {
  const {posts } = usePost();

	const blogContent = [
		{id:1, image:"assets/img/blog/blog-1.jpg", heading:"Team you want to work with mistake runners", content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit non molestiae rerum ut eos omnis et distinctio nulla! Harum magni tenetur obcaecati alias rerum, pariatur voluptas, dolorum, cum a vitae corporis impedit vel ea" },
		{id:2, image:"assets/img/blog/blog-2.jpg", heading:"Lights winged seasons fish abundantly evening", content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit non molestiae rerum ut eos omnis et distinctio nulla! Harum magni tenetur obcaecati alias rerum, pariatur voluptas, dolorum, cum a vitae corporis impedit vel ea" },
		{id:3, image:"assets/img/blog/blog-3.jpg", heading:"Winged moved stars, food creature seed night", content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit non molestiae rerum ut eos omnis et distinctio nulla! Harum magni tenetur obcaecati alias rerum, pariatur voluptas, dolorum, cum a vitae corporis impedit vel ea" },
	]
  return (
    <>
	<section className='blog-page section-padding'>
		<div className="container">
			<div className="row">
				<div className='col-lg-8 col-sm-12 col-xs-12'>
					{posts.map((item) => (
                    <div key={item.id} className="single_blog_page">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="img-fluid"  />
                      )}
                      <h2>
						<Link>{item.title}</Link>
					  </h2>
                      <p>
                        {item.content}
                      </p>
					  <Link className="single_blog_page_btn" to="blog-post.html">Read More</Link>
                      {/* <small className="text-secondary">ID: {item.id}</small> */}
                    </div>
                  ))}
					{blogContent.map((item)=>{
						return <div key={item.id} className='single_blog_page'>
							<img src={item.image} className='img-fluid' alt="" />
							<h2>
								<Link>{item.heading}</Link>
							</h2>
							<p>{item.content}</p>
							<Link className="single_blog_page_btn" to="blog-post.html">Read More</Link>
						</div>
					})}
				</div>
				<div className="col-lg-4 col-sm-12 col-xs-12">
					<div className="blog_search">
						<input type="text" className="form-control" placeholder="Type & Press Enter" />
					</div>
					<div className="latest_blog">
						<h4 className="blog_sidebar_title">Most read</h4>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
					</div>
					<div className="categories">
						<h4 className="blog_sidebar_title">Categories</h4>
						<ul>
							<li><Link to="#"><i className="ti-arrow-right"></i> Photography</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Business</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Responsive Design</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Web Design</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Branding</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Marketing</Link></li>
						</ul>
					</div>
					<div className="advertisement_post">
						<h4 className="blog_sidebar_title">Advertisement</h4>
						<Link to="#"><img src="assets/img/blog/banner_3.jpg" className="img-responsive" alt="" /></Link>
					</div>
					<div className="video_post">
						<h4 className="blog_sidebar_title">Video Widget</h4>
						<iframe src="https://player.vimeo.com/video/62026718"></iframe>
					</div>
					<div className="tag">
						<h4 className="blog_sidebar_title">Tag cloud</h4>
						<Link to="#">Design</Link>
						<Link to="#">Development</Link>
						<Link to="#">Seo</Link>
						<Link to="#">Responsive</Link>
						<Link to="#">Photopgraphy</Link>
						<Link to="#">How to build</Link>
						<Link to="#">All project</Link>
						<Link to="#">Clean Design</Link>
					</div>
				</div>
			</div>
		</div>
	</section>
    {/* <section className="blog-page section-padding">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 col-sm-12 col-xs-12">
					<div className="single_blog_page">
						<Link to="blog.html"><img src="assets/img/blog/blog-1.jpg" className="img-fluid" alt="image" /></Link>
						<h2><Link to="blog-post.html">Team you want to work with mistake runners</Link></h2>
						<span><Link to="#">Leave a Comment</Link></span> <span><Link to="#"> Product Design</Link> </span>
						<span> By <Link to="#">theme_ocean</Link> </span>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui venenatis
							dignissim. Aenean vitae metus in augue pretium ultrices. Fusce vitae risus nec dui venenatis
							dignissim. Aenean vitae metus in augue pretium ultrices.</p>
						<Link className="single_blog_page_btn" to="blog-post.html">Read More</Link>
					</div>
					<div className="single_blog_page">
						<Link to="blog.html"><img src="assets/img/blog/blog-2.jpg" className="img-fluid" alt="image" /></Link>
						<h2><Link to="blog-post.html">Lights winged seasons fish abundantly evening</Link></h2>
						<span><Link to="#">Leave a Comment</Link></span> <span><Link to="#"> Product Design</Link> </span>
						<span> By <Link to="#">theme_ocean</Link> </span>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui venenatis
							dignissim. Aenean vitae metus in augue pretium ultrices. Fusce vitae risus nec dui venenatis
							dignissim. Aenean vitae metus in augue pretium ultrices.</p>
						<Link className="single_blog_page_btn" to="blog-post.html">Read More</Link>
					</div>
					<div className="single_blog_page">
						<Link to="blog.html"><img src="assets/img/blog/blog-3.jpg" className="img-fluid" alt="image" /></Link>
						<h2><Link to="blog-post.html">Winged moved stars, food creature seed night</Link></h2>
						<span><Link to="#">Leave a Comment</Link></span> <span><Link to="#"> Product Design</Link> </span>
						<span> By <Link to="#">theme_ocean</Link> </span>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui venenatis
							dignissim. Aenean vitae metus in augue pretium ultrices. Fusce vitae risus nec dui venenatis
							dignissim. Aenean vitae metus in augue pretium ultrices.</p>
						<Link className="single_blog_page_btn" to="blog-post.html">Read More</Link>
					</div>
					
					<div id="pagination">
						<nav>
							<ul className="pagination blog_pagination">
								<li>
									<Link to="#" aria-label="Previous">
										<span aria-hidden="true">&laquo;</span>
									</Link>
								</li>
								<li><Link to="#">1</Link></li>
								<li><Link to="#">2</Link></li>
								<li><Link to="#">3</Link></li>
								<li><Link to="#">4</Link></li>
								<li><Link to="#">5</Link></li>
								<li>
									<Link to="#" aria-label="Next">
										<span aria-hidden="true">&raquo;</span>
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div className="col-lg-4 col-sm-12 col-xs-12">
					<div className="blog_search">
						<input type="text" className="form-control" placeholder="Type & Press Enter" />
					</div>
					<div className="latest_blog">
						<h4 className="blog_sidebar_title">Most read</h4>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
						<div className="single_latest_blog">
							<Link to="#">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
									venenatis dignissim.</h4>
							</Link>
						</div>
					</div>
					<div className="categories">
						<h4 className="blog_sidebar_title">Categories</h4>
						<ul>
							<li><Link to="#"><i className="ti-arrow-right"></i> Photography</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Business</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Responsive Design</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Web Design</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Branding</Link></li>
							<li><Link to="#"><i className="ti-arrow-right"></i> Marketing</Link></li>
						</ul>
					</div>
					<div className="advertisement_post">
						<h4 className="blog_sidebar_title">Advertisement</h4>
						<Link to="#"><img src="assets/img/blog/banner_3.jpg" className="img-responsive" alt="" /></Link>
					</div>
					<div className="video_post">
						<h4 className="blog_sidebar_title">Video Widget</h4>
						<iframe src="https://player.vimeo.com/video/62026718"></iframe>
					</div>
					<div className="tag">
						<h4 className="blog_sidebar_title">Tag cloud</h4>
						<Link to="#">Design</Link>
						<Link to="#">Development</Link>
						<Link to="#">Seo</Link>
						<Link to="#">Responsive</Link>
						<Link to="#">Photopgraphy</Link>
						<Link to="#">How to build</Link>
						<Link to="#">All project</Link>
						<Link to="#">Clean Design</Link>
					</div>
				</div>
			</div>
		</div>
	</section> */}
    </>
  )
}

export default Blog