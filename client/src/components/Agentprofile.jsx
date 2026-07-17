import React from "react";
import { Link } from "react-router-dom";

const Agentprofile = () => {
  const agentData = [
    {
      id: 1,
      image: "assets/img/team/1.png",
      name: "Thelma Banker",
      designation: "",
      content: "",
      email: "",
      phone: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      googleplus: "",
    },
    {
      id: 2,
      image: "assets/img/team/1.png",
      name: "Kallu Mastan",
      designation: "",
      content: "",
      email: "",
      phone: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      googleplus: "",
    },
    {
      id: 3,
      image: "assets/img/team/1.png",
      name: "Keno Sha",
      designation: "",
      content: "",
      email: "",
      phone: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      googleplus: "",
    },
    {
      id: 4,
      image: "assets/img/team/1.png",
      name: "Digbaji Kha",
      designation: "",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      email: "",
      phone: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      googleplus: "",
    },
  ];
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"> */}
              {agentData?.map((item) => {
                return (
                  <div
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    key={item.id}
                  >
                    <div className="p-6">
                      <div className="flex justify-center mb-4">
                        <img
                          src="assets/img/team/1.png"
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                          alt="Thelma Banker"
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-800 mb-1">
                          {item.name}
                        </h4>
                        <h5 className="text-sm text-blue-600 font-semibold mb-3">
                          Real Estate Agents
                        </h5>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                        </p>
                        <div className="space-y-2 text-left text-sm">
                          <p className="flex items-center text-gray-600">
                            <i className="fa fa-envelope-o w-5 text-blue-500"></i>
                            yourmail@gmail.com
                          </p>
                          <p className="flex items-center text-gray-600">
                            <i className="fa fa-phone w-5 text-blue-500"></i>
                            (+123) 123 123 123
                          </p>
                          <p className="flex items-center text-gray-600">
                            <i className="fa fa-plane w-5 text-blue-500"></i>
                            www.yourdomainname.com
                          </p>
                          <p className="flex items-center text-gray-600">
                            <i className="fa fa-skype w-5 text-blue-500"></i>
                            skype.address
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <ul className="flex justify-around space-x-4">
                          <li className="">
                            <Link
                              to="#"
                              className="text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <i className="fa fa-facebook text-lg"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="text-gray-500 hover:text-pink-600 transition-colors"
                            >
                              <i className="fa fa-instagram text-lg"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="text-gray-500 hover:text-blue-700 transition-colors"
                            >
                              <i className="fa fa-linkedin text-lg"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <i className="fa fa-google-plus text-lg"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <img
                      src="assets/img/team/1.png"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                      alt="Thelma Banker"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      Thelma Banker
                    </h4>
                    <h5 className="text-sm text-blue-600 font-semibold mb-3">
                      Real Estate Agents
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p>
                    <div className="space-y-2 text-left text-sm">
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-envelope-o w-5 text-blue-500"></i>
                        yourmail@gmail.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-phone w-5 text-blue-500"></i>
                        (+123) 123 123 123
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-plane w-5 text-blue-500"></i>
                        www.yourdomainname.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-skype w-5 text-blue-500"></i>
                        skype.address
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="flex justify-center space-x-4">
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <i className="fa fa-facebook text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          <i className="fa fa-instagram text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-700 transition-colors"
                        >
                          <i className="fa fa-linkedin text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <i className="fa fa-google-plus text-lg"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <img
                      src="assets/img/team/2.png"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                      alt="Kallu Mastan"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      Kallu Mastan
                    </h4>
                    <h5 className="text-sm text-blue-600 font-semibold mb-3">
                      Real Estate Agents
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p>
                    <div className="space-y-2 text-left text-sm">
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-envelope-o w-5 text-blue-500"></i>
                        yourmail@gmail.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-phone w-5 text-blue-500"></i>
                        (+123) 123 123 123
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-plane w-5 text-blue-500"></i>
                        www.yourdomainname.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-skype w-5 text-blue-500"></i>
                        skype.address
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="flex justify-center space-x-4">
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <i className="fa fa-facebook text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          <i className="fa fa-instagram text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-700 transition-colors"
                        >
                          <i className="fa fa-linkedin text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <i className="fa fa-google-plus text-lg"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <img
                      src="assets/img/team/3.png"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                      alt="Keno Sha"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      Keno Sha
                    </h4>
                    <h5 className="text-sm text-blue-600 font-semibold mb-3">
                      Real Estate Agents
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p>
                    <div className="space-y-2 text-left text-sm">
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-envelope-o w-5 text-blue-500"></i>
                        yourmail@gmail.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-phone w-5 text-blue-500"></i>
                        (+123) 123 123 123
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-plane w-5 text-blue-500"></i>
                        www.yourdomainname.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-skype w-5 text-blue-500"></i>
                        skype.address
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="flex justify-center space-x-4">
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <i className="fa fa-facebook text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          <i className="fa fa-instagram text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-700 transition-colors"
                        >
                          <i className="fa fa-linkedin text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <i className="fa fa-google-plus text-lg"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <img
                      src="assets/img/team/4.png"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                      alt="Digbaji Kha"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      Digbaji Kha
                    </h4>
                    <h5 className="text-sm text-blue-600 font-semibold mb-3">
                      Real Estate Agents
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p>
                    <div className="space-y-2 text-left text-sm">
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-envelope-o w-5 text-blue-500"></i>
                        yourmail@gmail.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-phone w-5 text-blue-500"></i>
                        (+123) 123 123 123
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-plane w-5 text-blue-500"></i>
                        www.yourdomainname.com
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fa fa-skype w-5 text-blue-500"></i>
                        skype.address
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="flex justify-around space-x-4">
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <i className="fa fa-facebook text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          <i className="fa fa-instagram text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-blue-700 transition-colors"
                        >
                          <i className="fa fa-linkedin text-lg"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <i className="fa fa-google-plus text-lg"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Agentprofile;
