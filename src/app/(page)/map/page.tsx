import Link from "next/link";

const Map = () => {
  return (
    <>
      <section className="map-wrap">
        <div className="map-inner">
          <div className="map-inner-over">
            <div className="map-inner-tooltip">
              <span>
                <img src="./images/map/loc-icon.svg" alt="" />
                0.8 miles away
              </span>
              <div className="map-inner-tooltip-in">
                <img src="./images/map/brand-logo.svg" alt="" />
                <h1>Lobster Dogs Food Truck</h1>
                <a href="business-details.html">
                  View Details <i className="far fa-chevron-right"></i>
                </a>
              </div>
            </div>
            <div className="map-inner-mark">
              <img src="./images/map/loc-mark.png" alt="" />
            </div>
          </div>

          <div className="map-inner-btn">
            <div className="home-btn">
              <Link href={"/"}>
                <i className="far fa-arrow-left"></i> Home
              </Link>
            </div>
            <div className="location-drop">
              <a className="btn btn-location text-left" href="#" role="button">
                {" "}
                Location{" "}
              </a>
              <div className="location-drop-list">
                <form>
                  <input type="text" placeholder="Select Location" />
                </form>
              </div>
            </div>
            <div className="dropdown mile-rad-range date-range">
              <a
                className="btn btn-date-range text-left"
                type="button"
                id="date-range-drop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select your Mile Radius{" "}
              </a>
              <ul
                className="dropdown-menu w-100 volovo-range"
                aria-labelledby="date-range-drop"
              >
                <div className="miles-inner">
                  <div className="sliders_control">
                    <input
                      id="fromSlider"
                      type="range"
                      defaultValue="0"
                      min="0"
                      max="100"
                    />
                    <input
                      id="toSlider"
                      type="range"
                      defaultValue="30"
                      min="0"
                      max="100"
                      style={{
                        background:
                          "linear-gradient(to right, rgb(224, 224, 224) 0%, rgb(224, 224, 224) 0%, rgb(230, 0, 35) 0%, rgb(230, 0, 35) 30%, rgb(224, 224, 224) 30%, rgb(224, 224, 224) 100%)",
                        zIndex: "0",
                      }}
                    />
                  </div>
                  <div className="form_control">
                    <div className="form_control_container">
                      <input
                        className="form_control_container__time__input"
                        type="number"
                        id="fromInput"
                        defaultValue="0"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="form_control_container">
                      <input
                        className="form_control_container__time__input num-last"
                        type="number"
                        id="toInput"
                        defaultValue="30"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div
              className="dropdown date-range"
              style={{ marginRight: "auto" }}
            >
              <a
                className="btn select-categories text-left"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {" "}
                Popular categories{" "}
              </a>
              <ul
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(3)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(50)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(20)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(10)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(20)</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lorem Ipsum <span>(10)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="map-inner-image">
            <img src="images/map/map-bg.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Map;
