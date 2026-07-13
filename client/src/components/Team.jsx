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
      {/* <div className="p-5">
        <h3>Meet Our Team</h3>
        <div className="team-grid grid mb-5">
          {teamMember.map((item) => {
            return (
              <div className="team-card text-center">
                <div key={item.id}>
					<img src={item.image} className="img-fluid rounded-full w-[100px]" alt="" />
                  <h4>{item.name}</h4>
                  <p>{item.designation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* <div className='p-5'>
		<h3 style={{marginTop:"50px"}}>Meet Our Team</h3>
    <div className="team-grid mb-5">
      <div className="team-card text-center">
        <i className="fas fa-user-circle">
			<img src="assets/img/team/team-1.jpg" className="img-fluid rounded-full w-[100px]" alt="" />
		</i>
        <h4>Rahul Sharma</h4>
        <p>Founder & CEO</p>
      </div>
      <div className="team-card">
        <i className="fas fa-user-circle"></i>
        <h4>Priya Patel</h4>
        <p>Head of Operations</p>
      </div>
      <div className="team-card">
        <i className="fas fa-user-circle"></i>
        <h4>Amit Singh</h4>
        <p>Real Estate Consultant</p>
      </div>
      <div className="team-card">
        <i className="fas fa-user-circle"></i>
        <h4>Neha Gupta</h4>
        <p>Marketing Director</p>
      </div>
    </div>
	</div> */}
      <section id="team" className="our_team section-padding">
		<div className="container">
			<div className="section-title text-center wow zoomIn">
				<h2>Professional team</h2>
				<div></div>
			</div>
			<div className="row text-center">
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_team">
						<img src="assets/img/team/team-1.jpg" className="img-fluid" alt="" />
						<h3>Juthi Ahmed</h3>
						<p>Co Founder</p>
						<ul className="list-inline">
							<li><a href="#" className="st-facebook"><i className="fa fa-facebook"></i></a></li>
							<li><a href="#" className="st-twitter"><i className="fa fa-instagram"></i></a></li>
							<li><a href="#" className="st-instagram"><i className="fa fa-instagram"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_team">
						<img src="assets/img/team/team-2.jpg" className="img-fluid" alt="" />
						<h3>Masum Billah</h3>
						<p>Co Founder</p>
						<ul className="list-inline">
							<li><a href="#" className="st-facebook"><i className="fa fa-facebook"></i></a></li>
							<li><a href="#" className="st-twitter"><i className="fa fa-instagram"></i></a></li>
							<li><a href="#" className="st-instagram"><i className="fa fa-instagram"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_team">
						<img src="assets/img/team/team-3.jpg" className="img-fluid" alt="" />
						<h3>Syed Ekram</h3>
						<p>Co Founder</p>
						<ul className="list-inline">
							<li><a href="#" className="st-facebook"><i className="fa fa-facebook"></i></a></li>
							<li><a href="#" className="st-twitter"><i className="fa fa-instagram"></i></a></li>
							<li><a href="#" className="st-instagram"><i className="fa fa-instagram"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-sm-3 col-xs-12">
					<div className="single_team">
						<img src="assets/img/team/team-4.jpg" className="img-fluid" alt="" />
						<h3>Hanjala Haque</h3>
						<p>Co Founder</p>
						<ul className="list-inline">
							<li><a href="#" className="st-facebook"><i className="fa fa-facebook"></i></a></li>
							<li><a href="#" className="st-twitter"><i className="fa fa-instagram"></i></a></li>
							<li><a href="#" className="st-instagram"><i className="fa fa-instagram"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  );
};

export default Team;
