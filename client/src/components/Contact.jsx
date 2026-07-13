import React from "react";

const Contact = () => {
  return (
    <>
      <section className="contact-area section-padding">
        <div className="container">
          <div className="section-title text-center wow zoomIn">
            <h2>Get In touch</h2>
            <div></div>
          </div>
          <div className="row ">
            <div className="col-lg-8 col-sm-8 col-xs-12">
              <div className="single_contact_one">
                <div className="contact">
                  <form
                    id="contact-form"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="row">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="subject"
                          className="form-control"
                          placeholder="Subject"
                          required="required"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <textarea
                          rows="6"
                          name="message"
                          className="form-control"
                          placeholder="Your Message"
                          required="required"
                        ></textarea>
                      </div>
                      <div className="col-md-12 text-center">
                        <button
                          type="submit"
                          value="Send message"
                          name="submit"
                          id="submitButton"
                          className="btn btn-contact-bg"
                          title="Submit Your Message!"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="single_contact_two">
                <div className="single_address">
                  <i className="fa fa-rocket color-one"></i>
                  <h4>Our Location</h4>
                  <p>2369 Robinson Lane Jackson, OH 45640</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-phone color-two"></i>
                  <h4>Call us on</h4>
                  <p>(+1) 216-328-7141 </p>
                </div>
                <div className="single_address single_address_mbnone">
                  <i className="fa fa-envelope color-three"></i>
                  <h4>Send message</h4>
                  <p>admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.957183635167!2d-74.00402768559431!3d40.71895904512855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598a1316e7a7%3A0x47bb20eb6074b3f0!2sNew%20Work%20City%20-%20(CLOSED)!5e0!3m2!1sbn!2sbd!4v1600305497356!5m2!1sbn!2sbd"
          //   style="border:0;"
          //   allowFullScreen=""
          //   aria-hidden="false"
          //   tabIndex="0"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
