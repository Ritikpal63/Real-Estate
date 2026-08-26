import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  Handshake,
  Headphones,
  MapPin,
  Network,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import axiosInstance from "../utils/axiosConfig";

const priceText = (value) => {
  const n = Number(value || 0);

  if (!n) return "Price on request";

  if (n >= 10000000) {
    return `₹${(n / 10000000).toFixed(2)} Cr`;
  }

  if (n >= 100000) {
    return `₹${(n / 100000).toFixed(2)} Lakh`;
  }

  return `₹${n.toLocaleString("en-IN")}`;
};

const getArrayData = (response, keys = []) => {
  const body = response?.data;

  if (Array.isArray(body)) {
    return body;
  }

  if (Array.isArray(body?.data)) {
    return body.data;
  }

  for (const key of keys) {
    if (Array.isArray(body?.[key])) {
      return body[key];
    }

    if (Array.isArray(body?.data?.[key])) {
      return body.data[key];
    }
  }

  return [];
};

const SectionTitle = ({ children }) => {
  return (
    <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#081734] sm:text-base">
      <span className="h-[3px] w-5 shrink-0 rounded-full bg-[#078cff]" />
      {children}
    </h2>
  );
};

const PropertyCard = ({ p }) => {
  const transactionType = String(p.transaction_type || "").toUpperCase();

  const status =
    transactionType === "SALE"
      ? "For Sale"
      : transactionType === "RENT"
        ? "For Rent"
        : transactionType === "LEASE"
          ? "For Lease"
          : p.status || p.type || "Property";

  return (
    <Link
      to={`/property/${p.id}`}
      className="group block min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-[170px] overflow-hidden">
        <img
          src={p.image || "/assets/img/portfolio/2.jpg"}
          alt={p.title}
          onError={(e) => {
            e.currentTarget.src = "/assets/img/portfolio/2.jpg";
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-md bg-[#0a83ff] px-2.5 py-1 text-[10px] font-bold text-white shadow">
          {status}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-bold text-[#081734] transition group-hover:text-blue-600">
          {p.title}
        </h3>

        <p className="mt-2 flex min-w-0 items-center gap-1 text-[11px] text-slate-500">
          <MapPin size={13} className="shrink-0 text-blue-500" />
          <span className="truncate">
            {p.location ||
              [p.locality, p.city].filter(Boolean).join(", ") ||
              "NCR"}
          </span>
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs">
          <span className="whitespace-nowrap font-semibold text-slate-600">
            {p.size || p.area || "—"} Sq.Ft.
          </span>

          <span className="text-right font-extrabold text-[#081734]">
            {priceText(p.price)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-blue-100 bg-blue-50/50 py-2.5 text-xs font-bold text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
          View Details
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [filters, setFilters] = useState({
    mode: "rent",
    location: "",
    type: "",
    budget: "",
    area: "",
  });
  const handlePostProperty = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/admin");
      return;
    }

    sessionStorage.setItem("redirectAfterLogin", "/admin");

    navigate("/admin");
  };

  useEffect(() => {
    const loadHomeData = async () => {
      const [propertyResult, newsResult, serviceResult, jobResult] =
        await Promise.allSettled([
          axiosInstance.get("/property/all", {
            params: {
              limit: 6,
              offset: 0,
            },
          }),

          axiosInstance.get("/news/allnews"),

          axiosInstance.get("/services", {
            params: {
              limit: 6,
            },
          }),

          axiosInstance.get("/jobs", {
            params: {
              limit: 4,
            },
          }),
        ]);

      if (propertyResult.status === "fulfilled") {
        const data = getArrayData(propertyResult.value, [
          "properties",
          "property",
          "rows",
        ]);

        setProperties(data);
      } else {
        console.error(
          "Property API Error:",
          propertyResult.reason?.response?.data ||
            propertyResult.reason?.message,
        );
      }

      if (newsResult.status === "fulfilled") {
        const data = getArrayData(newsResult.value, [
          "news",
          "allNews",
          "rows",
        ]);

        setNews(data);
      } else {
        console.error(
          "News API Error:",
          newsResult.reason?.response?.data || newsResult.reason?.message,
        );
      }

      if (serviceResult.status === "fulfilled") {
        const data = getArrayData(serviceResult.value, [
          "services",
          "service",
          "rows",
        ]);

        setServices(data);
      } else {
        console.error(
          "Services API Error:",
          serviceResult.reason?.response?.data || serviceResult.reason?.message,
        );
      }

      if (jobResult.status === "fulfilled") {
        const data = getArrayData(jobResult.value, ["jobs", "job", "rows"]);

        setJobs(data);
      } else {
        console.error(
          "Jobs API Error:",
          jobResult.reason?.response?.data || jobResult.reason?.message,
        );
      }
    };

    loadHomeData();
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();

    const qs = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        qs.set(key, value);
      }
    });

    navigate(`/property?${qs.toString()}`);
  };

  const serviceIcons = [
    Building2,
    BriefcaseBusiness,
    Newspaper,
    Headphones,
    Network,
    TrendingUp,
  ];

  const displayedServices = services
    .slice(0, 6)
    .map((service, index) => [
      serviceIcons[index] || Building2,
      service.title,
      service.description,
    ]);

  const displayedJobs = jobs.slice(0, 4);

  const featured = properties.slice(0, 3);

  const newsItems = news.slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-[#081734]">
      <section className="relative min-h-[640px] overflow-hidden bg-[#020b21] text-white">
        <img
          src="/assets/img/bg/NCR04.jpg"
          alt="NCR Space Connect"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,9,28,.98)_0%,rgba(1,10,31,.91)_36%,rgba(1,11,34,.42)_67%,rgba(1,10,31,.22)_100%)]" />

        <div className="relative z-10 mx-auto w-[90vw] pb-32 pt-14 lg:pt-20">
          <div className="max-w-[670px]">
            <img
              src="/assets/img/ncrlogowithoutbg.png"
              alt="NCR Space Connect"
              className="mb-4 h-24 w-24 object-contain sm:h-28 sm:w-28"
            />

            <h1 className="text-[38px] font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-[48px] lg:text-[58px] xl:text-[64px]">
              Connecting
              <br />
              Businesses, Spaces
              <br />
              <span className="text-[#00a8ff]">& Opportunities</span>
              <br />
              Across NCR
            </h1>

            <p className="mt-5 max-w-[620px] text-sm leading-7 text-slate-200 sm:text-base">
              NCR Space Connect is your trusted platform for office space
              solutions, real estate opportunities, property news and business
              networking across NCR.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/property"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0074df]"
              >
                Find Office Space
                <ArrowRight size={17} />
              </Link>

              <button
                type="button"
                onClick={handlePostProperty}
                className="inline-flex items-center rounded-md border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-[#061735]"
              >
                Post Your Property
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-[90px] w-[90vw]">
        <form
          onSubmit={submitSearch}
          className="overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(5,23,53,.18)] ring-0 ring-slate-200"
        >
          <div className="grid items-stretch lg:grid-cols-[170px_minmax(0,1fr)]">
            <div className="grid h-full grid-cols-3 bg-[#071632] text-white lg:grid-cols-1 lg:grid-rows-3">
              {[
                ["rent", "For Rent"],
                ["sale", "For Sale"],
                ["coworking", "Coworking"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      mode: value,
                    }))
                  }
                  className={`flex h-full min-h-[55px] items-center justify-center gap-2 px-4 text-xs font-semibold transition lg:min-h-0 lg:justify-start ${
                    filters.mode === value
                      ? "bg-[#087dff]"
                      : "bg-[#071632] hover:bg-[#0c2349]"
                  }`}
                >
                  <Building2 size={16} className="shrink-0" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="grid min-w-0 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:p-6">
              <label className="min-w-0 text-xs font-semibold text-slate-600">
                Location
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Select Location"
                  className="mt-2 h-[46px] w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-[#081734] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="min-w-0 text-xs font-semibold text-slate-600">
                Property Type
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className="mt-2 h-[46px] w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-[#081734] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">All Type</option>
                  <option value="Office">Office</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Shop">Shop</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Coworking">Coworking</option>
                </select>
              </label>

              <label className="min-w-0 text-xs font-semibold text-slate-600">
                Budget
                <select
                  value={filters.budget}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      budget: e.target.value,
                    }))
                  }
                  className="mt-2 h-[46px] w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-[#081734] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Min - Max</option>
                  <option value="0-50000">Under ₹50k</option>
                  <option value="50000-100000">₹50k - ₹1L</option>
                  <option value="100000+">₹1L+</option>
                </select>
              </label>

              <label className="min-w-0 text-xs font-semibold text-slate-600">
                Area (sq.ft.)
                <select
                  value={filters.area}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      area: e.target.value,
                    }))
                  }
                  className="mt-2 h-[46px] w-full min-w-0 rounded-md border border-slate-200 bg-white px-3 text-sm text-[#081734] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Min - Max</option>
                  <option value="0-1000">0 - 1000</option>
                  <option value="1000-2500">1000 - 2500</option>
                  <option value="2500-5000">2500 - 5000</option>
                  <option value="5000+">5000+</option>
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-md bg-[#116df2] px-5 text-sm font-bold text-white transition hover:bg-[#075ed9]"
              >
                <Search size={17} />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <section className="mx-auto w-[90vw] pt-5">
        <div className="grid w-full overflow-hidden rounded-2xl bg-[#031333] shadow-lg ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [
              ShieldCheck,
              "Verified Listings",
              "100% verified office spaces & properties",
            ],
            [
              CalendarDays,
              "Daily Updates",
              "Get latest property news & market trends",
            ],
            [
              BriefcaseBusiness,
              "Job Opportunities",
              "Find top real estate jobs across NCR",
            ],
            [
              Users,
              "Owner & Tenant Support",
              "Dedicated support for all your needs",
            ],
            [
              Handshake,
              "Business Networking",
              "Connect with builders, brokers & businesses",
            ],
          ].map(([Icon, title, description]) => (
            <div
              key={title}
              className="group flex min-w-0 items-start gap-4 border-b border-white/10 p-5 transition-all duration-300 sm:border-r lg:border-b-0 lg:border-r last:border-r-0"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a86ff]/10 text-[#1689ff] ring-1 ring-[#1689ff]/20 transition-all duration-300 group-hover:bg-[#1689ff] group-hover:text-white">
                <Icon size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-[14px] font-bold leading-5 text-white">
                  {title}
                </h3>

                <p className="mt-1 break-words text-[12px] leading-[18px] text-slate-300">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[90vw] py-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="min-w-0 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <SectionTitle>Our Services</SectionTitle>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
              {displayedServices.length > 0 ? (
                displayedServices.map(([Icon, title, description]) => (
                  <Link to="/allservice" key={title} className="group min-w-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#078cff] transition group-hover:bg-[#078cff] group-hover:text-white">
                      <Icon size={24} />
                    </div>

                    <h3 className="mt-3 break-words text-sm font-bold text-[#081734] transition group-hover:text-blue-600">
                      {title}
                    </h3>

                    <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-slate-500">
                      {description || "Service details will be available soon."}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-xs text-slate-400">
                  No services available
                </div>
              )}
            </div>

            <Link
              to="/allservice"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#061735] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#0a86ff]"
            >
              Explore All Services
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="min-w-0 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle>Featured Office Spaces</SectionTitle>

              <Link
                to="/property"
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                View All ›
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featured.length > 0 ? (
                featured.map((property) => (
                  <PropertyCard key={property.id} p={property} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-sm text-slate-400">
                  No properties available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[90vw]">
        <div className="grid overflow-hidden rounded-xl bg-[#031333] text-white shadow-lg sm:grid-cols-2 lg:grid-cols-5">
          {[
            [Building2, "5000+", "Office Spaces"],
            [Users, "1200+", "Property Owners"],
            [BriefcaseBusiness, "2500+", "Jobs Available"],
            [Network, "1000+", "Businesses Connected"],
            [Sparkles, "10K+", "Happy Users"],
          ].map(([Icon, number, label]) => (
            <div
              key={label}
              className="flex min-w-0 items-center justify-center gap-4 border-b border-white/10 px-5 py-7 sm:border-r lg:border-b-0 lg:border-r last:border-r-0"
            >
              <Icon className="shrink-0 text-[#1091ff]" size={34} />

              <div className="min-w-0">
                <div className="text-2xl font-extrabold text-white">
                  {number}
                </div>

                <div className="break-words text-xs text-slate-300">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[90vw] py-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="min-w-0 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle>Latest Real Estate News</SectionTitle>

              <Link
                to="/news/allnews"
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                View All ›
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <Link
                    to={`/news/${item.id}`}
                    key={item.id}
                    className="group flex min-w-0 gap-3"
                  >
                    <img
                      src={item.image || "/assets/img/blog/blog-1.jpg"}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = "/assets/img/blog/blog-1.jpg";
                      }}
                      className="h-[68px] w-[95px] shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 break-words text-xs font-bold leading-5 text-[#081734] transition group-hover:text-blue-600">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString(
                              "en-IN",
                            )
                          : "Date unavailable"}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-10 text-center text-xs text-slate-400">
                  No news available
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle>Latest Job Openings</SectionTitle>

              <Link
                to="/jobs"
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                View All ›
              </Link>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {displayedJobs.length > 0 ? (
                displayedJobs.map((job) => (
                  <div
                    key={job.id || job.title}
                    className="flex min-w-0 items-center gap-3 py-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                      <BriefcaseBusiness size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-bold text-[#081734]">
                        {job.title}
                      </div>

                      <div className="mt-1 truncate text-[11px] text-slate-400">
                        {job.location || "NCR"} •{" "}
                        {job.employment_type || job.job_type || "Full Time"}
                      </div>
                    </div>

                    <div className="max-w-[120px] shrink-0 text-right text-[10px] font-semibold leading-4 text-slate-500">
                      {job.salary || job.salary_range || "Salary negotiable"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-xs text-slate-400">
                  No jobs available
                </div>
              )}
            </div>
          </div>

          <div className="flex min-h-[290px] min-w-0 flex-col items-center justify-center rounded-xl bg-[linear-gradient(145deg,#062455,#031332)] p-8 text-center text-white shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15 text-[#0a86ff] ring-1 ring-blue-400/20">
              <Handshake size={25} />
            </div>

            <h3 className="text-2xl font-extrabold leading-tight text-white">
              Let&apos;s Build Better
              <br />
              Business Connections
              <br />
              Across NCR
            </h3>

            <p className="mx-auto mt-4 max-w-[330px] text-xs leading-5 text-slate-300">
              Join NCR Space Connect and be a part of the fastest growing real
              estate community.
            </p>

            <Link
              to="/contact"
              className="mx-auto mt-6 inline-flex items-center gap-2 rounded-md bg-[#0a86ff] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0074df]"
            >
              Join Our Community
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
