import React, { useState } from "react";

const NewsletterPage = () => {
  const crousel = [
    { id: 1, pic: "/assets/img/partner/1.png" },
    { id: 2, pic: "/assets/img/partner/2.png" },
    { id: 3, pic: "/assets/img/partner/3.png" },
    { id: 4, pic: "/assets/img/partner/4.png" },
    { id: 5, pic: "/assets/img/partner/5.png" },
    { id: 6, pic: "/assets/img/partner/1.png" },
    { id: 7, pic: "/assets/img/partner/2.png" },
    { id: 8, pic: "/assets/img/partner/3.png" },
    { id: 9, pic: "/assets/img/partner/4.png" },
  ];
  return (
    <>
      <section className="newsletter section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="partner  block gap-2 wow fadeInRight owl-carousel owl-theme">
                <div className="owl-wrapper-outer">
                  <div
                    className="owl-wrapper"
                    style={{
                      width: "5560px",
                      left: "0px",
                      display: "block",
                      transition: "800ms",
                      transform: "translate3d(-1112px, 0px, 0px)",
                    }}
                  >
                    {crousel.map((item) => {
                      return (
                        <div
                          className="owl-item"
                          key={item.id}
                          style={{ width: "278px" }}
                        >
                          <a href="">
                            <img src={item.pic} alt="image" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-sm-12 col-xs-12 text-center">
              <div className="signup_form">
                <h3 className="section-title-white">
                  Subscribe to stay update
                </h3>

                <form
                  noValidate=""
                  className="validate"
                  name="mc-embedded-subscribe-form"
                  method="post"
                  action="#"
                >
                  <input
                    type="email"
                    placeholder="Enter Email"
                    id="mce-email"
                    className="form-control"
                    name="EMAIL"
                  />
                  <span>
                    <button
                      className="btn btn-detault btn-light-bg"
                      name="subscribe"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </span>
                  <div id="mce-responses">
                    <div
                      style={{ display: "none" }}
                      id="mce-error-response"
                      className="response"
                    ></div>
                    <div
                      style={{ display: "none" }}
                      id="mce-success-response"
                      className="response"
                    ></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterPage;
