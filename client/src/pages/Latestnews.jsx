import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../utils/axiosConfig';


const LatestnewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/news');
      
      
      if (response.data.success) {
        setNews(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch news');
      }
      
    } catch (error) {
      console.error("News Error:", error);
      
      if (error.response) {
        console.error("Server Error:", error.response.data);
        setError(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        console.error("No Response:", error.request);
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        console.error("Error:", error.message);
        setError('Failed to load news. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' })
    };
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'General': 'bg-blue-100 text-blue-600',
      'Market Trends': 'bg-purple-100 text-purple-600',
      'Investment Tips': 'bg-green-100 text-green-600',
      'Property News': 'bg-orange-100 text-orange-600',
      'Legal Updates': 'bg-red-100 text-red-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Latest <span className="text-green-500">News</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in real estate
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-2xl mx-auto">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
            <button 
              onClick={getNews} 
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">No news articles available yet.</p>
                <p className="text-gray-400">Check back soon for updates!</p>
              </div>
            ) : (
              news.map((item) => {
                const { day, month } = formatDate(item.createdAt);
                return (
                  <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    {/* Blog Image */}
                    <div className="relative overflow-hidden h-56">
                      <Link to={`/news/${item.id}`}>
                        <img 
                          src={item.image || 'assets/img/blog/blog-1.jpg'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = 'assets/img/blog/blog-1.jpg';
                          }}
                        />
                      </Link>
                      
                      {/* Post Date Badge */}
                      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 text-center min-w-[60px]">
                        <span className="block text-2xl font-bold text-gray-800">{day}</span>
                        <span className="block text-sm text-gray-500 uppercase">{month}</span>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                          {item.category || 'General'}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-green-500 transition-colors line-clamp-2">
                        <Link to={`/news/${item.id}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.summary || item.content?.substring(0, 120) + '...' || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui venenatis dignissim.'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          By {item.author || 'Admin'}
                        </span>
                        <Link 
                          to={`/news/${item.id}`} 
                          className="text-green-500 font-semibold hover:text-green-600 transition-colors flex items-center gap-1"
                        >
                          Read More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && news.length > 0 && (
          <div className="text-center mt-12">
            <Link 
              to="/all-news" 
              className=""
            >
              <span className="inline-block btn-contact-bg">
				View All News
			  </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestnewsPage;






// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// const LatestnewsPage = () => {
// 	const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getNews = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await axios.get('http://localhost:5000/api/news');
      
//       console.log("Full Response:", response);
//       console.log("Response Data:", response.data);
//       console.log("News Array:", response.data.data);
      
//       if (response.data.success) {
//         setNews(response.data.data);
//       } else {
//         setError(response.data.message || 'Failed to fetch news');
//       }
      
//     } catch (error) {
//       console.error("News Error:", error);
      
//       if (error.response) {
//         console.error("Server Error:", error.response.data);
//         setError(error.response.data.message || 'Server error occurred');
//       } else if (error.request) {
//         console.error("No Response:", error.request);
//         setError('Cannot connect to server. Please check if backend is running.');
//       } else {
//         console.error("Error:", error.message);
//         setError('Failed to load news. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getNews();
//   }, []);
//   return (
//     <>
//     <section id="blog" className="fresh-news section-padding">
// 		<div className="container">
// 			<div className="section-title text-center">
// 				<h2>Latest News</h2>
// 				{
// 					news?.map((item)=>{
// 						return <div key={item.id}>
// 							<p style={{fontSize:"20pxs"}} className='text-lg text-red-600 '>Title: {item.category}</p>
// 						</div>
// 					})
// 				}
// 				<div></div>
// 			</div>
// 			<div className="row">
// 				<div className="col-lg-4 col-sm-4 col-xs-12">
// 					<div className="single_blog">
// 						<div className="blog_img">
// 							<Link href="blog.html"><img src="assets/img/blog/blog-1.jpg" className="img-fluid"
// 									alt="image" /></Link>
// 							<div className="post-date">
// 								<span className="date">15</span>
// 								<span className="month">Sep</span>
// 							</div>
// 						</div>
// 						<div className="blog_content">
// 							<h3><Link href="blog.html">Team you want to work with mistake runners</Link></h3>
// 							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
// 								venenatis dignissim.</p>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="col-lg-4 col-sm-4 col-xs-12">
// 					<div className="single_blog">
// 						<div className="blog_img">
// 							<Link href="blog.html"><img src="assets/img/blog/blog-2.jpg" className="img-fluid"
// 									alt="image" /></Link>
// 							<div className="post-date">
// 								<span className="date">16</span>
// 								<span className="month">Sep</span>
// 							</div>
// 						</div>
// 						<div className="blog_content">
// 							<h3><Link href="blog.html">Lights winged seasons fish abundantly evening</Link></h3>
// 							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
// 								venenatis dignissim.</p>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="col-lg-4 col-sm-4 col-xs-12">
// 					<div className="single_blog">
// 						<div className="blog_img">
// 							<Link href="blog.html"><img src="assets/img/blog/blog-3.jpg" className="img-fluid"
// 									alt="image" /></Link>
// 							<div className="post-date">
// 								<span className="date">17</span>
// 								<span className="month">Sep</span>
// 							</div>
// 						</div>
// 						<div className="blog_content">
// 							<h3><Link href="blog.html">Winged moved stars, food creature seed night</Link></h3>
// 							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui
// 								venenatis dignissim.</p>
// 						</div>
// 					</div>
// 				</div>
//                 			</div>
// 		</div>
// 	</section>
//     </>
//   )
// }

// export default LatestnewsPage