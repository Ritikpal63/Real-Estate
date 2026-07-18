import React from 'react';
// If using Next.js: import Link from 'next/link';
// If using React Router: import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  Users, 
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock hook simulation for this standalone snippet. 
// Replace this line with: const { pathname } = useLocation(); (React Router) or const router = useRouter(); (Next.js)
const useMockPathname = () => '/admin/add-property';

const Sidebar = () => {
  const currentPath = useMockPathname(); // e.g., location.pathname

  const navItems = [
    {
      type: 'link',
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      type: 'category',
      label: 'MANAGEMENT',
    },
    {
      type: 'link',
      path: '/admin/addproperty',
      label: 'Add Property',
      icon: PlusCircle,
    },
    {
      type: 'link',
      path: '/admin/view-property',
      label: 'View Properties',
      icon: Building2,
    },
    {
      type: 'link',
      path: '/admin/addteam',
      label: 'Add Team Member',
      icon: UserPlus,
    },
    {
      type: 'link',
      path: '/admin/view-team',
      label: 'View Team',
      icon: Users,
    },
    {
      type: 'link',
      path: '/admin/addblog',
      label: 'Add Blog Post',
      icon: PlusCircle,
    },
    {
      type: 'link',
      path: '/admin/addnews',
      label: 'Add News Article',
      icon: PlusCircle,
    },
    {
      type: 'link',
      path: '/admin/addgallery',
      label: 'Add Gallery Album',
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="w-80 min-h-180 relative bg-[#374256] text-gray-300 flex flex-col justify-between font-sans">
      <div>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#2d3d56]">
          <Home className="w-6 h-6 text-blue-400" />
          <span className="text-md font-semibold tracking-wide text-white">
            NCRSpaceConnect <span className="text-gray-400 font-normal text-sm">Admin</span>
          </span>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          {navItems.map((item, index) => {
            if (item.type === 'category') {
              return (
                <div 
                  key={index} 
                  className="px-3 pt-4 pb-2 text-xs font-bold tracking-wider text-gray-500 uppercase"
                >
                  {item.label}
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full d-flex link items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative block ${
                  isActive
                    ? 'bg-[#2b3c56] text-white font-semibold'
                    : 'hover:bg-[#28374f] hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r" />
                )}
                
                <Icon 
                  className={`w-5 h-5 link transition-colors duration-200 ${
                    isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'
                  }`} 
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#2d3d56] bg-[#374256] bottom-0 absolute">
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 p-1 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-2xl font-mono">
            NCR
          </div>
          <div className="flex-1 overflow-hidden">
            <h5 className="text-sm font-medium text-white truncate">NCR Space Connect</h5>
            <p className="text-xs text-gray-400 truncate">ncr@realestate.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;












// import React from "react";
// import { Link } from "react-router-dom";

// const AdminAsideSection = () => {
//   return (
//     <div>
//       {" "}
//       <h5 className="text-center">Add Details</h5>
//       <ul className="">
//         <li>
//           <Link to="/admin/addproperty" className="hover:text-red-700 text-xl">
//             Add Property Detail
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/addblog" className="hover:text-red-700 text-xl">
//             Add Blog Detail
//           </Link>
//         </li>
//         <li>
//           <Link className="hover:text-red-700 text-xl">Add Property Detail</Link>
//         </li>
//         <li>
//           <Link className="hover:text-red-700 text-xl">Add Property Detail</Link>
//         </li>
//         <li>
//           <Link className="hover:text-red-700 text-xl">Add Property Detail</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default AdminAsideSection;
