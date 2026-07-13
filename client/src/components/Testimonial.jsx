import React from 'react'

const Testimonial = () => {
  return (
    <>
    <section data-stellar-background-ratio="0.3" className="our_testimonial section-padding"
		style="background-image: url(assets/img/bg/testimonial-bg.jpg);  background-size:cover;background-position:center;">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 col-sm-12 col-xs-12 text-center">
					<div className="testimonial1-carousel">
						<div className="single-testimonial">
							<img src="assets/img/testimonial/1.jpg" alt="" />
							<h4>Mark Richard</h4>
							<span>Architecture</span>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
								venenatis dignissim. Aenean vitae metus in augue pretium ultrices. Duis dictum eget
								dolor vel blandit.</p>
						</div>
						<div className="single-testimonial">
							<img src="assets/img/testimonial/2.jpg" alt="" />
							<h4>Mark Richard</h4>
							<span>Architecture</span>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
								venenatis dignissim. Aenean vitae metus in augue pretium ultrices. Duis dictum eget
								dolor vel blandit.</p>
						</div>
						<div className="single-testimonial">
							<img src="assets/img/testimonial/3.jpg" alt="" />
							<h4>Mark Richard</h4>
							<span>Architecture</span>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
								venenatis dignissim. Aenean vitae metus in augue pretium ultrices. Duis dictum eget
								dolor vel blandit.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default Testimonial