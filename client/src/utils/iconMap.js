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
  FaRegNewspaper } from
"react-icons/fa";

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
  FaRegNewspaper
};


export const iconOptions = Object.entries(iconMap).map(([name, icon]) => ({
  name,
  icon
}));
