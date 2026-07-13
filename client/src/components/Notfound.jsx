import React from 'react'

const Notfound = () => {
  return (
    <>
        <section class="error-page section-padding">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 offset-lg-3 col-sm-12 col-xs-12 text-center">
					<div class="error_page">
						<h1>4<span>0</span>4</h1>
						<h2>The requested URL was not found on this server.</h2>
						<form>
							<div class="form-group has-feedback  wow fadeInRight" data-wow-duration="1s"
								data-wow-delay="0.3s" data-wow-offset="0">
								<input type="text" placeholder="Search" class="form-control" />
								<a href="#"><i class="fa fa-search form-control-feedback"></i></a>
							</div>
						</form>
						<a href="/" class="btn-contact-bg">Back To Home</a>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default Notfound