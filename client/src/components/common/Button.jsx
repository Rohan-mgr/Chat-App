import PropTypes from "prop-types";

function Button({ type, children }) {
  return (
    <button className="primary" type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
