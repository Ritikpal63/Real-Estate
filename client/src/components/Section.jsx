import React from "react";

const Section = ({title, classTitle, classPara, sectionpara}) => {
  return (
    <>
      <section className="section-top" style={{backgroundColor:"#374256"}}>
        <div className="container">
          <div className="col-lg-10 offset-lg-1 col-xs-12 text-center">
            <div
              className="section-top-title wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
            >
              <h1 className={`${classTitle}`}>{title}</h1>
              <p className={`${classPara}`}>{sectionpara}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section;
