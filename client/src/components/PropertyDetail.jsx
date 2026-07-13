import React from 'react'

const PropertyDetail = () => {
  return (
    <>
    <section className="property_single_details section-padding">
		<div className="container">
			<div className="row">
				<div className="col-md-9 col-sm-9 col-xs-12">
					<div className="property_single_details_slide">
						<img src="/assets/img/2.jpg" className="img-fluid" alt="About-Slide" />
					</div>
					<div className="property_single_details_price">
						<h1>2045 B Street</h1>
						<h4>$235,254</h4>
						<p>2369 Robinson Lane Jackson, OH 45640</p>
						<ul>
							<li><i className="fa fa-check"></i> 4 bed rooms</li>
							<li><i className="fa fa-check"></i> 1 garage</li>
							<li><i className="fa fa-check"></i> 960 sq ft</li>
						</ul>
					</div>
					<div className="property_single_details_description">
						<h4>Property description</h4>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book. It has survived not only five
							centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
							passages, and more recently with desktop publishing software like Aldus PageMaker including
							versions of Lorem Ipsum.</p>
					</div>
					<div className="property_info">
						<div className="row">
							<div className="col-md-12 col-sm-12 col-xs-12">
								<div className="single_property_list">
									<h4>Amenities</h4>
									<ul className="single_property_list_mr">
										<li><i className="fa fa-check"></i> Video</li>
										<li><i className="fa fa-check"></i> Hairdryer</li>
										<li><i className="fa fa-check"></i> Cot</li>
										<li><i className="fa fa-check"></i> Dishwasher</li>
										<li><i className="fa fa-check"></i> Parquet</li>
										<li><i className="fa fa-check"></i> Iron</li>
									</ul>
									<ul className="single_property_list_mr">
										<li><i className="fa fa-check"></i> Air conditioning</li>
										<li><i className="fa fa-check"></i> Cable TV</li>
										<li><i className="fa fa-check"></i> Grill</li>
										<li><i className="fa fa-check"></i> Juicer</li>
										<li><i className="fa fa-check"></i> Use of pool</li>
										<li><i className="fa fa-check"></i> Toaster</li>
									</ul>
									<ul>
										<li><i className="fa fa-check"></i> Video</li>
										<li><i className="fa fa-check"></i> Hairdryer</li>
										<li><i className="fa fa-check"></i> Cot</li>
										<li><i className="fa fa-check"></i> Dishwasher</li>
										<li><i className="fa fa-check"></i> Parquet</li>
										<li><i className="fa fa-check"></i> Iron</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="property_map">
						<h4>on map</h4>
						<div className="map-pro">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.957183635167!2d-74.00402768559431!3d40.71895904512855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598a1316e7a7%3A0x47bb20eb6074b3f0!2sNew%20Work%20City%20-%20(CLOSED)!5e0!3m2!1sbn!2sbd!4v1600305497356!5m2!1sbn!2sbd"
								style={{border:"0"}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
						</div>
					</div>
					<div className="single_similar_property">
						<div className="row">
							<div className="col-md-6 col-sm-6 col-xs-12">
								<div className="single_property">
									<img src="assets/img/property/1.jpg" className="img-fluid" alt="" />
									<div className="single_property_description text-center">
										<span><i className="fa fa-object-group"></i> 900 sq ft</span>
										<span><i className="fa fa-bed"></i> 4 Badrooms</span>
										<span><i className="fa fa-star-o"></i> 2 Baths</span>
									</div>
									<div className="single_property_content">
										<h4><a href="#">2045 B Street</a></h4>
										<p>Lorem Ipsum is not simply random text. It has roots in a piece of classNameical.
										</p>

									</div>
									<div className="single_property_price">
										High Meadow Lane Mount Pleasant <span>$ 170,000</span>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-6 col-xs-12">
								<div className="single_property">
									<img src="assets/img/property/2.jpg" className="img-fluid" alt="" />
									<div className="single_property_description text-center">
										<span><i className="fa fa-object-group"></i> 900 sq ft</span>
										<span><i className="fa fa-bed"></i> 4 Badrooms</span>
										<span><i className="fa fa-star-o"></i> 2 Baths</span>
									</div>
									<div className="single_property_content">
										<h4><a href="#">Lynn Ogden Lane</a></h4>
										<p>Lorem Ipsum is not simply random text. It has roots in a piece of classNameical.
										</p>

									</div>
									<div className="single_property_price">
										High Meadow Lane Mount Pleasant <span>$ 170,000</span>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-3 col-sm-3 col-xs-12">
					<div className="single_property_form">
						<h4>Enquire here</h4>
						<form className="form" name="enq" method="post" action="/contact"
							>
							<div className="row">
								<div className="form-group col-md-12">
									<input type="text" name="name" className="form-control" id="first-name"
										placeholder="Name" required="required" />
								</div>
								<div className="form-group col-md-12">
									<input type="email" name="email" className="form-control" id="email" placeholder="Email"
										required="required" />
								</div>
								<div className="form-group col-md-12">
									<input type="text" name="phone" className="form-control" id="phone" placeholder="Phone"
										required="required" />
								</div>
								<div className="form-group col-md-12 mbnone">
									<textarea rows="6" name="message" className="form-control" id="description"
										placeholder="Your Message" required="required"></textarea>
								</div>
								<div className="col-md-12">
									<div className="actions">
										<input type="submit" value="Send message" name="submit" id="submitButton"
											className="btn btn-lg btn-contact-bg" title="Submit Your Message!" />
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className="single_property_form_agent">
						<div className="single_property_form_agent_profile">
							<img src="assets/img/team/team-1.jpg" className="img-fluid" alt="" />
							<h4><i className="fa fa-phone"></i> +88 123 123 123</h4>
							<h4><a href="#">info@example.com</a></h4>
						</div>
						<div className="single_property_form_agent_profile">
							<img src="assets/img/team/team-2.jpg" className="img-fluid" alt="" />
							<h4><i className="fa fa-phone"></i> +88 123 123 123</h4>
							<h4><a href="#">info@example.com</a></h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default PropertyDetail