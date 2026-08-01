import {
  FaBuilding,
  FaUsers,
  FaStore,
  FaWarehouse,
  FaHome,
  FaExchangeAlt,
  FaChartLine,
  FaHandshake,
  FaBullhorn,
  FaShareAlt,
  FaNewspaper,
  FaBullseye,
  FaPodcast,
  FaVideo,
  FaCamera,
  FaListAlt,
  FaRegNewspaper,
} from "react-icons/fa";

export const iconMap = {
  FaBuilding,
  FaUsers,
  FaStore,
  FaWarehouse,
  FaHome,
  FaExchangeAlt,
  FaChartLine,
  FaHandshake,
  FaBullhorn,
  FaShareAlt,
  FaNewspaper,
  FaBullseye,
  FaPodcast,
  FaVideo,
  FaCamera,
  FaListAlt,
  FaRegNewspaper,
};

// Dropdown options
export const iconOptions = Object.entries(iconMap).map(([name, icon]) => ({
  name,
  icon,
}));