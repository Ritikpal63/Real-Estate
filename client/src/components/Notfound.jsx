import React from 'react'

const Notfound = () => {
  return (
    <>
        <section className="error-page section-padding">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12 text-center">
					<div className="error_page">
						<h1>4<span>0</span>4</h1>
						<h2>The requested URL was not found on this server.</h2>
						<form>
							<div className="form-group has-feedback  wow fadeInRight" data-wow-duration="1s"
								data-wow-delay="0.3s" data-wow-offset="0">
								<input type="text" placeholder="Search" className="form-control" />
								<a href="#"><i className="fa fa-search form-control-feedback"></i></a>
							</div>
						</form>
						<a href="/" className="btn-contact-bg">Back To Home</a>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default Notfound