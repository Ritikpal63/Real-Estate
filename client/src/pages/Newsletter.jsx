import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewsletterPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const crousel = [
    { id: 1, pic: "/assets/img/partner/M3M01.jpg" },
    { id: 2, pic: "/assets/img/partner/M3mElleSaab02.jpg" },
    { id: 3, pic: "/assets/img/partner/M3M03.jpg" },
    { id: 4, pic: "/assets/img/partner/M3MTRUMP04.jpg" },
    { id: 5, pic: "/assets/img/partner/Godrege05.jpg" },
    { id: 6, pic: "/assets/img/partner/County06.jpg" },
    { id: 7, pic: "/assets/img/partner/Supertechc07.jpg" },
    { id: 8, pic: "/assets/img/partner/ACE08.jpg" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "🎉 Successfully subscribed to our newsletter!",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: "Subscription failed. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#394458]">
      <div className="container mx-auto px-4">
        {/* Partner Logos Carousel */}
        <div className="mb-12 overflow-hidden " style={{width:"100%"}}>
          <div className="flex gap-8 animate-scroll">
            {crousel.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <Link href="#" className="block">
                  <img
                    src={item.pic}
                    alt="Partner"
                    className="w-full h-35 object-contain filter hover:filter-none transition-all duration-300"
                  />
                </Link>
              </div>
            ))}
           
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Subscribe to <span className="text-yellow-300">Stay Updated</span>
            </h3>
            <p className="text-white/80 mb-6">
              Get the latest real estate news and updates delivered to your
              inbox
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring- focus:bg-white transition-all duration-300"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#35AC39] font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Message Display */}
              {message.text && (
                <div
                  className={`p-3 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-600/20 text-green-100 border border-green-500/50"
                      : "bg-red-600/20 text-red-100 border border-red-500/50"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </form>

            <p className="text-white/60 text-xs mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default NewsletterPage;

