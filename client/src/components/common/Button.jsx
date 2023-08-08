import PropTypes from "prop-types";

function Button({ type, children }) {
  return (
    <button type={type} className="primary">
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
