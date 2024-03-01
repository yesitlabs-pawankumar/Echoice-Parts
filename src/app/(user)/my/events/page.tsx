"use client"
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-multi-date-picker"

const Events = () => {
  const [location, setLocation] = useState(false);

  return (
    <>
      <div className="user-dashboard-data user-my-eve">
        <div className="user-my-favorites">
          <div className="deals-inner-search">
            <form action="">
              <label className="interests-search">
                <input type="text" placeholder="Search for Events" />
                <button><Image width={20} height={21} src="/images/search.png" alt="" /></button>
              </label>
            </form>
          </div>
        </div>
        <div className="user-my-voop-eve">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="show-cal-loc-range">
                <div className="dropdown date-range">
                  <a className="btn select-categories text-left" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false"> Event Categories </a>
                  <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Lorem Ipsum <span>(3)</span></a></li>
                    <li><a className="dropdown-item" href="#">Lorem Ipsum <span>(50)</span></a></li>
                    <li><a className="dropdown-item" href="#">Lorem Ipsum <span>(20)</span></a></li>
                    <li><a className="dropdown-item" href="#">Lorem Ipsum <span>(10)</span></a></li>
                    <li><a className="dropdown-item" href="#">Lorem Ipsum <span>(20)</span></a></li>
                    <li><a className="dropdown-item" href="#">Lorem Ipsum <span>(10)</span></a></li>
                  </ul>
                </div>
                <div className="calendar">
                  <div className="broker-date">
                    <DatePicker
                      range={true}
                      numberOfMonths={2}
                      placeholder="Start & End Date"
                      onChange={(e) => console.log(e)}
                    />
                  </div>
                </div>
                <div className="location-drop">
                  <a onClick={() => setLocation(location ? false : true)} className="btn btn-location text-left" href="#" role="button"> Location </a>
                  <div className="location-drop-list" style={{ display: (location ? 'block' : 'none') }}>
                    <form>
                      <input type="text" placeholder="Select Location" />
                    </form>
                  </div>
                </div>
                <div className="dropdown mile-rad-range date-range">
                  <a className="btn btn-date-range text-left" type="button" id="date-range-drop"
                    data-bs-toggle="dropdown" aria-expanded="false">Select your Mile Radius </a>
                  <ul className="dropdown-menu w-100 volovo-range" aria-labelledby="date-range-drop">
                    <div className="miles-inner">
                      <div className="sliders_control">
                        <input id="fromSlider" type="range" defaultValue="0" min="0" max="100" />
                        <input id="toSlider" type="range" defaultValue="30" min="0" max="100"
                          style={{ background: "linear-gradient(to right, rgb(224, 224, 224) 0%, rgb(224, 224, 224) 0%, rgb(230, 0, 35) 0%, rgb(230, 0, 35) 30%, rgb(224, 224, 224) 30%, rgb(224, 224, 224) 100%)", zIndex: "0" }} />
                      </div>
                      <div className="form_control">
                        <div className="form_control_container">
                          <input className="form_control_container__time__input" type="number" id="fromInput"
                            defaultValue="0" min="0" max="100" />
                        </div>
                        <div className="form_control_container">
                          <input className="form_control_container__time__input num-last" type="number" id="toInput"
                            defaultValue="30" min="0" max="100" />
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="event-brand-box w-100">
                <div className="brand-logo">
                  <span>Free</span>
                  <Image width={290} height={226} src="/images/near-event1.png" alt="" />
                </div>
                <div className="event-pad">
                  <h6>Lobster Dogs Food Truck</h6>
                  <p>An evening with inspirational vibes, curated for your enjoyment and listening pleasure.</p>
                  <div className="point-icon">
                    <span><Image width={20} height={20} src="/images/location-dot.png" alt="" /> miles away</span>
                    <span><Image width={20} height={20} src="/images/calendar.png" alt="" /> April 04, 2023 </span>
                    <span><Image width={20} height={20} src="/images/watch.png" alt="" /> 7:50 AM to 8:00PM </span>
                  </div>
                  <a className="btn btn-viewmore-border" href="user-event-details.html" role="button">View More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center mt-5">
              <nav className="pagingation-style">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                  <li className="page-item"><a className="page-link active" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;