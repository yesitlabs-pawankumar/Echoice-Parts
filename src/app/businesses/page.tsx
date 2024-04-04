"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Businesses = () => {
  const [data, setData] = useState([{}, {}, {}]);

  return (
    <>
      <div
        className="inner-banner"
        style={{
          backgroundImage: "url(/images/about-bnr.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1> Explore Businesses </h1>
        <p>Find Your A-ha!</p>
      </div>
      <div className="container">
        <div className="row justify-content-center p-3">
          <div className="col-lg-6">
            <form className="d-flex new-srchbox mb-3">
              <input
                className="new-srch"
                type="search"
                placeholder="Search for Businesses"
                aria-label="Search"
              />
              <button className="srch-btn srch-btn-page" type="submit">
                <Image width={15} height={16} src="/images/search.png" alt="" />
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-5">
            <div className="event-cat">
              <h5>Event Categories</h5>
              <ul>
                <li>
                  <a href="#">
                    Lorem Ipsum <span>(3)</span>{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    Lorem Ipsum <span>(50)</span>{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    Lorem Ipsum <span>(20)</span>{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    Lorem Ipsum <span>(10)</span>{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    Business Event<span>(20)</span>{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    Business Event <span>(10)</span>{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9 col-md-7">
            <div className="row">
              <div className="col-lg-12 mb-3">
                <div className="show-cal-loc-range show-in-right">
                  <div className="location-drop">
                    <a
                      className="btn btn-location text-left"
                      href="#"
                      role="button"
                    >
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
                  <div className="dropdown sort-drop">
                    <a
                      className="btn sort text-left"
                      type="button"
                      id="sort-drop"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {" "}
                      Sort{" "}
                    </a>
                    <ul
                      className="dropdown-menu w-100"
                      aria-labelledby="sort-drop"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          Top Rating{" "}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          Near By{" "}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          Upcoming Events{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown ratings-drop">
                    <a
                      className="btn ratings text-left"
                      type="button"
                      id="rating-drop"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {" "}
                      Ratings{" "}
                    </a>
                    <ul
                      className="dropdown-menu w-100"
                      aria-labelledby="rating-drop"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          Low to High
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          High to Low
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {data &&
                data.map((item, index) => {
                  return (
                    <div key={index} className="col-lg-4">
                      <div className="event-brand-box">
                        <div className="brand-logo">
                          <Image
                            width={285}
                            height={223}
                            src="/images/near-event1.png"
                            alt=""
                          />
                          <div className="event-price"> $5 </div>
                        </div>
                        <div className="event-pad">
                          <h6>Lobster Dogs Food Truck</h6>
                          <p>
                            An evening with inspirational vibes, curated for
                            your enjoyment and listening pleasure.
                          </p>
                          <div className="point-icon">
                            <span>
                              <Image
                                width={20}
                                height={20}
                                src="/images/location-dot.png"
                                alt=""
                              />{" "}
                              4 miles away{" "}
                            </span>
                            <span>
                              <Image
                                width={20}
                                height={20}
                                src="/images/calendar.png"
                                alt=""
                              />{" "}
                              April 04, 2023{" "}
                            </span>
                            <span>
                              <Image
                                width={20}
                                height={20}
                                src="/images/watch.png"
                                alt=""
                              />{" "}
                              7:50 AM to 8:00PM{" "}
                            </span>
                          </div>
                          <Link
                            className="btn btn-viewmore-border"
                            href={"/businesses/123"}
                            role="button"
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="col-lg-12 text-center">
                <nav className="pagingation-style">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Prev
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Businesses;
