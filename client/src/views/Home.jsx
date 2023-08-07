import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import LoginImage450 from "../assets/images/banner-image-450.png"; // desktop;
import LoginImage300 from "../assets/images/banner-image-300.png"; // tablet;
import LoginImage350 from "../assets/images/banner-image-350.png"; // mobile;
import ChatAppLogo from "../assets/images/chat-app-logo.png";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { useFormik } from "formik";
import { userLoginSchema, userSignupSchema } from "../validation/validation";

function Home() {
  const [formState, setFormState] = useState(false);
  const nodeRef = useRef(null);

  const handleNavSignUpClick = () => {
    setFormState(true);
  };
  const handleNavLoginClick = () => {
    setFormState(false);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: formState ? userSignupSchema : userLoginSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <div className="home">
      <div className="home__image">
        <div className="home__image__text">
          <h1>Connecting...,</h1>
          <h3>The people around the World</h3>
        </div>
        <div className="home__image__wrapper">
          <img
            src={LoginImage350}
            srcSet={`${LoginImage350} 350w, ${LoginImage300} 300w, ${LoginImage450} 450w`}
            sizes="(max-width: 599.98px) 83.33vw, (max-width: 999.98px) 39.06vw, 450px"
            alt="banner-image-mobile.png"
          />
        </div>
      </div>
      <div className="home__form">
        <div className="home__form__logo">
          <img src={ChatAppLogo} width="150px" height="120px" alt="app-logo" />
        </div>
        <h3>Login To Start Conversation</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="form__navigation">
            <div
              className={`form__navigation__nav ${
                formState ? "active__nav" : ""
              }`}
              onClick={handleNavSignUpClick}
            >
              <p>Sign Up</p>
            </div>
            <div
              className={`form__navigation__nav ${
                !formState ? "active__nav" : ""
              }`}
              onClick={handleNavLoginClick}
            >
              <p>Login</p>
            </div>
          </div>
          <CSSTransition
            in={formState}
            nodeRef={nodeRef}
            timeout={500}
            classNames="signup-field"
            unmountOnExit
          >
            <div className="from-group" ref={nodeRef}>
              <InputField
                type="text"
                placeholder="Full Name"
                name="fullName"
                errorMsg={formik.errors.fullName}
                handleChange={formik.handleChange}
                value={formik.values.fullName}
              />
            </div>
          </CSSTransition>
          <div className="from-group">
            <InputField
              type="email"
              placeholder="Email"
              errorMsg={formik.errors.email}
              name="email"
              handleChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="from-group">
            <InputField
              type="password"
              placeholder="Password"
              errorMsg={formik.errors.password}
              name="password"
              handleChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <Button type="submit">{!formState ? "Login" : "Sign Up"}</Button>
        </form>
      </div>
    </div>
  );
}

export default Home;
