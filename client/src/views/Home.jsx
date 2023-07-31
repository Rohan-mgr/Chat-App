import LoginImage450 from "../assets/images/banner-image-450.png"; // desktop;
import LoginImage300 from "../assets/images/banner-image-300.png"; // tablet;
import LoginImage390 from "../assets/images/banner-image-390.png"; // mobile;
import LoginImage410 from "../assets/images/banner-image-410.png"; // mobile;
import LoginImage200 from "../assets/images/banner-image-200.png"; // mobile;
import LoginImage554 from "../assets/images/banner-image-554.png"; // mobile;
import LoginImage600 from "../assets/images/banner-image-600.png"; // mobile;

function Home() {
  return (
    <div className="home">
      <div className="home__image">
        <div className="home__image__text">
          <h1>Connecting...,</h1>
          <h3>The people around the World</h3>
        </div>
        <div className="home__image__wrapper">
          <picture>
            <source media="(min-width: 900px)" srcSet={LoginImage450} />
            <source media="(min-width: 700px)" srcSet={LoginImage300} />
            <source
              srcSet={
                (LoginImage200 + " 28.62w",
                LoginImage390 + " 55.80w",
                LoginImage410 + " 58.66w",
                LoginImage554 + " 79.26w",
                LoginImage600 + " 85.84w")
              }
            />
            <img src={LoginImage390} alt="banner-image-mobile.png" />
          </picture>
        </div>
      </div>
      <div className="home__form">form ui here</div>
    </div>
  );
}

export default Home;
