import React from 'react'

const Register = () => {
  return (
    <>
    <section className="login_register section-padding">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12">
					<div className="register">
						<h4 className="login_register_title">Create a new account:</h4>
						<div className="form-group">
							<input type="text" id="contact-name" className=" form-control requiredField input-label"
								placeholder="Username" name="name" />
						</div>
						<div className="form-group">
							<input type="text" id="contact-name" className=" form-control requiredField input-label"
								placeholder="Enter Name" name="name" />
						</div>
						<div className="form-group">
							<input type="email" id="contact-email" className="form-control requiredField input-label"
								placeholder="Enter Email" name="email" />
						</div>
						<div className="form-group">
							<input type="password" id="contact-email" className="form-control requiredField input-label"
								placeholder="Enter Password" name="password" />
						</div>
						<div className="form-group col-md-12 mbnone">
							<button className="btn btn-contact-bg" type="submit" name="submit">signup now</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default Register