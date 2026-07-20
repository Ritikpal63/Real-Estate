// src/components/Section.jsx
import React from "react";

const Section = ({ title, classTitle, classPara, sectionpara }) => {
  return (
    <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#374256" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="section-top-title">
            <h1
              className={`${classTitle} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white break-words`}
            >
              {title}
            </h1>
            {sectionpara && (
              <p
                className={`${classPara} sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mt-4`}
              >
                {sectionpara}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
