import PropTypes from "prop-types";

const StatsCard = ({ title, value, icon, bgColor = "bg-blue-600" }) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-5
        flex
        items-center
        justify-between
        hover:shadow-lg
        transition
        duration-300
      "
    >
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">{value}</h2>
      </div>

      <div
        className={`
          ${bgColor}
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          text-white
          text-2xl
        `}
      >
        {icon}
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  bgColor: PropTypes.string,
};

export default StatsCard;
