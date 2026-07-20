import React from "react";

const Team = () => {
  const teamMember = [
    {
      id: 1,
      name: "Rahul Sharma",
      designation: "Founder & CEO",
      image: "assets/img/team/team-1.jpg",
    },
    {
      id: 1,
      name: "Priya Patel",
      designation: "Head of Operations",
      image: "assets/img/team/team-2.jpg",
    },
    {
      id: 1,
      name: "Amit Singh",
      designation: "Real Estate Consultant",
      image: "assets/img/team/team-3.jpg",
    },
    {
      id: 1,
      name: "Neha Gupta",
      designation: "Marketing Director",
      image: "assets/img/team/team-4.jpg",
    },
  ];
  return (
    <>
      <section id="team" className="our_team section-padding">
        <div className="container">
          <div className="section-title text-center wow zoomIn">
            <h2>Professional team</h2>
          </div>
          <div className="row text-center">
            <div className="col-lg-3 col-sm-3 col-xs-12">
              {teamMember?.map((item) => {
                return (
                  <div key={item.id} className="single_team">
                    <img
                      src={item.image}
                      className="img-fluid"
                      alt=""
                    />
                    <h3>{item.name}</h3>
                    <p>{item.designation}</p>
                    <ul className="list-inline">
                      <li>
                        <a href="#" className="st-facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="st-twitter">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="st-instagram">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* <section id="team" className="our_team section-padding">
        <div className="container">
          <div className="section-title text-center wow zoomIn">
            <h2>Professional team</h2>
          </div>
          <div className="row text-center">
            <div className="col-lg-3 col-sm-3 col-xs-12">
              <div className="single_team">
                <img
                  src="assets/img/team/team-1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <h3>Juthi Ahmed</h3>
                <p>Co Founder</p>
                <ul className="list-inline">
                  <li>
                    <a href="#" className="st-facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-twitter">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-instagram">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-xs-12">
              <div className="single_team">
                <img
                  src="assets/img/team/team-2.jpg"
                  className="img-fluid"
                  alt=""
                />
                <h3>Masum Billah</h3>
                <p>Co Founder</p>
                <ul className="list-inline">
                  <li>
                    <a href="#" className="st-facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-twitter">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-instagram">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-xs-12">
              <div className="single_team">
                <img
                  src="assets/img/team/team-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <h3>Syed Ekram</h3>
                <p>Co Founder</p>
                <ul className="list-inline">
                  <li>
                    <a href="#" className="st-facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-twitter">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-instagram">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-xs-12">
              <div className="single_team">
                <img
                  src="assets/img/team/team-4.jpg"
                  className="img-fluid"
                  alt=""
                />
                <h3>Hanjala Haque</h3>
                <p>Co Founder</p>
                <ul className="list-inline">
                  <li>
                    <a href="#" className="st-facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-twitter">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="st-instagram">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Team;
