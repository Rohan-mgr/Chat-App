import PropTypes from "prop-types";

export default function InputField({
  type,
  placeholder,
  onChange,
  value,
  errorMsg,
}) {
  console.log(errorMsg);
  return (
    <div>
      <input
        className={`${errorMsg ? "inputRedBorder" : ""}`}
        type={type}
        placeholder={placeholder || " "}
        onChange={onChange}
        value={value}
      ></input>
      {errorMsg && <p className="errorMessage">{errorMsg}</p>}
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
};
