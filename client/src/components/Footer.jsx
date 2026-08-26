import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import axiosInstance from "../utils/axiosConfig";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletter = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setLoading(true);
      setMessage("");

      const res = await axiosInstance.post("/newsletter/subscribe", {
        email: email.trim(),
      });

      setMessage(
        res.data?.message || "Subscribed successfully!",
      );

      setEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to subscribe. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#020d25] text-white">
      <div className="mx-auto w-[90vw] py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_0.8fr_0.9fr_1.55fr] lg:gap-12">

          <div>
            <img
              src="/assets/img/ncrlogowithoutbg.png"
              alt="NCR Space Connect"
              className="h-[90px] w-[90px] object-contain"
            />

            <p className="mt-4 max-w-[230px] text-[12px] leading-5 text-slate-400">
              NCR Space Connect is a leading platform for
              office space solutions, real estate jobs,
              property news and business networking across
              Delhi-NCR.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-[19px] font-normal uppercase leading-6 text-white">
              Quick
              <br />
              Links
            </h3>

            <ul className="space-y-2 text-[12px]">
              <li>
                <Link
                  to="/"
                  className="text-[#078cff] transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-[#078cff] transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/allservice"
                  className="text-[#078cff] transition hover:text-white"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/property"
                  className="text-[#078cff] transition hover:text-white"
                >
                  Office Space
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="text-[#078cff] transition hover:text-white"
                >
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[19px] font-normal uppercase leading-6 text-white">
              Useful
              <br />
              Links
            </h3>

            <ul className="space-y-2 text-[12px]">
              <li>
                <Link
                  to="/news/allnews"
                  className="text-[#078cff] transition hover:text-white"
                >
                  News
                </Link>
              </li>

              <li>
                <Link
                  to="/partners"
                  className="text-[#078cff] transition hover:text-white"
                >
                  Partners
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-[#078cff] transition hover:text-white"
                >
                  Post Property
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-[#078cff] transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-[#078cff] transition hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[19px] font-normal uppercase text-white">
              Follow Us
            </h3>

            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition hover:bg-[#078cff]"
              >
                <i className="fa fa-facebook" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition hover:bg-[#078cff]"
              >
                <i className="fa fa-linkedin" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition hover:bg-[#078cff]"
              >
                <i className="fa fa-instagram" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition hover:bg-[#078cff]"
              >
                <i className="fa fa-youtube-play" />
              </a>
            </div>

            <div className="mt-10 space-y-2 text-[11px] text-slate-400">
              <a
                href="tel:+919911819708"
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Phone size={14} />
                <span>+91 99118 19708</span>
              </a>

              <a
                href="mailto:info@ncrspaceconnect.com"
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={14} />
                <span>info@ncrspaceconnect.com</span>
              </a>

              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                <span>Noida, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[19px] font-normal uppercase text-white">
              Newsletter
            </h3>

            <p className="text-[12px] leading-5 text-slate-400">
              Subscribe to get latest property updates and
              market news.
            </p>

            <form
              onSubmit={handleNewsletter}
              className="mt-6 flex h-[54px] w-full max-w-[360px] overflow-hidden rounded-md border border-slate-500 bg-[#111c35]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex w-[58px] shrink-0 items-center justify-center bg-[#078cff] text-white transition hover:bg-[#0076dc] disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            {message && (
              <p className="mt-3 text-[11px] text-slate-400">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-[90vw] flex-col gap-4 py-7 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} NCR Space Connect.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <Link
              to="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <span>|</span>

            <Link
              to="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;