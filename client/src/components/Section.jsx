import React from "react";

const Section = ({title, classTitle, classPara, sectionpara}) => {
  return (
    <>
      <section 
  className="section-top py-12 md:py-16 lg:py-20"
  style={{ backgroundColor: "#374256" }}
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <div
        className="section-top-title wow fadeInRight"
        data-wow-duration="1s"
        data-wow-delay="0.3s"
        data-wow-offset="0"
      >
        <h1 className={`${classTitle} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white pt-5 leading-tight`}>
          {title}
        </h1>
        {/* <p className={`${classPara} flex-row items-center sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed`}>
          {sectionpara}
        </p> */}
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Section;
