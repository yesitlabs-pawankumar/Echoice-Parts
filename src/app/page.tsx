import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="banner">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-5">
              <div className="bnr-txt">
                <h1>VoolayVoo</h1>
                <h6>
                  VoolayVoo informs you of new products, services, and offerings
                  from your most favored and trusted retailers, restaurants,
                  food trucks, entertainment, sports, and recreation venues,
                  etc., when you want or need them.
                </h6>
                <button type="button" className="btn btn-bnr home-ban-btn">
                  <Link href={"/voopons"}>Explore more</Link>
                </button>
                <button type="button" className="btn btn-bnr home-ban-btn">
                  <Link href={"/map"}>
                    Show Map{" "}
                    <Image
                      width={25}
                      height={25}
                      src="/images/map-point.svg"
                      alt=""
                    />
                  </Link>
                </button>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="banner-img">
                <Image
                  width={699}
                  height={453}
                  src="/images/banner-img.png"
                  alt="banner images"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="clientbox">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-lg-12">
              <div id="client" className="owl-carousel">
                <div className="item">
                  <div className="menu-tab-box">
                    <div className="menu-iconbox">
                      <img src="./images/service-1.png" alt="client logo" />{" "}
                    </div>
                    <p>Food Store</p>
                  </div>
                </div>
                <div className="item">
                  <div className="menu-tab-box">
                    <div className="menu-iconbox">
                      <img src="./images/service-2.png" alt="client logo" />{" "}
                    </div>
                    <p>Travel Agency</p>
                  </div>
                </div>
                <div className="item">
                  <div className="menu-tab-box">
                    <div className="menu-iconbox">
                      <img src="./images/service-3.png" alt="client logo" />{" "}
                    </div>
                    <p>Shopping</p>
                  </div>
                </div>
                <div className="item">
                  <div className="menu-tab-box">
                    <div className="menu-iconbox">
                      <img src="./images/service-4.png" alt="client logo" />{" "}
                    </div>
                    <p>Restaurants</p>
                  </div>
                </div>
                <div className="item">
                  <div className="menu-tab-box">
                    <div className="menu-iconbox">
                      <img src="./images/service-5.png" alt="client logo" />{" "}
                    </div>
                    <p>Movie</p>
                  </div>
                </div>
                <div className="item">
                  <div className="menu-tab-box">
                    <div className="menu-iconbox">
                      <img src="./images/service-6.png" alt="client logo" />{" "}
                    </div>
                    <p>Entertainment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="added-voopons">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading mb-3">
                {" "}
                Newly <span> Added Voopons </span>{" "}
              </div>
            </div>
            <div className="col-lg-12">
              <div id="voopons-slider" className="owl-carousel">
                <div className="item">
                  <div className="voopan-box">
                    <div className="voopon-logo">
                      <img src="./images/voopons-logo-1.png" alt="" />
                    </div>
                    <div className="voopon-heading">Flat 45% OFF </div>
                    <h5>Lobster Dogs Food Truck</h5>
                    <p>Valid Thru: Aug 15, 2023</p>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="voopan-box">
                    <div className="voopon-logo">
                      <img src="./images/voopons-logo-2.png" alt="" />
                    </div>
                    <div className="voopon-heading">Flat 45% OFF </div>
                    <h5>Lorem ipsum dolor sit amet, consectetur </h5>
                    <p>Valid Thru: Aug 15, 2023</p>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="voopan-box">
                    <div className="voopon-logo">
                      <img src="./images/voopons-logo-3.png" alt="" />
                    </div>
                    <div className="voopon-heading">Flat 45% OFF </div>
                    <h5>Lorem ipsum dolor sit amet, consectetur </h5>
                    <p>Valid Thru: Aug 15, 2023</p>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="voopan-box">
                    <div className="voopon-logo">
                      <img src="./images/voopons-logo-4.png" alt="" />
                    </div>
                    <div className="voopon-heading">Flat 45% OFF </div>
                    <h5>Lorem ipsum dolor sit amet, consectetur </h5>
                    <p>Valid Thru: Aug 15, 2023</p>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-img">
                <Image
                  width={546}
                  height={491}
                  src="/images/about.png"
                  alt="images"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-txt">
                <h5 style={{ color: "#E60023" }}>About</h5>
                <div className="heading mb-3">
                  {" "}
                  What is <span> VoolayVoo? </span>{" "}
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.{" "}
                </p>
                <p>
                  Lorem Ipsum has been the industry&apos;s standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of
                  type and scrambled it to make a type specimen book. It has
                  survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged.
                </p>
                <Link
                  className="btn btn-learnmore"
                  href={"/about"}
                  role="button"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="voopons-love">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading mb-3">
                {" "}
                Voopons You <span> Will Love </span>{" "}
              </div>
            </div>
            <div className="col-lg-12">
              <div id="voopons-love-slider" className="owl-carousel">
                <div className="item">
                  <div
                    className="love-box"
                    style={{ backgroundImage: "url(./images/lovbg1.png)" }}
                  >
                    <div className="love-left">
                      <img
                        src="./images/lov-volimg.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="love-right">
                      <h5>Off-the rock</h5>
                      <h2>Fashion Store</h2>
                      <h5>Flat 20% Off</h5>
                      <a className="btn btn-explore" href="#" role="button">
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="love-box"
                    style={{ backgroundImage: "url(./images/lovbg2.png)" }}
                  >
                    <div className="love-left">
                      <img
                        src="./images/lov-volimg2.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="love-right">
                      <h5>Off-the rock</h5>
                      <h2>Fashion Store</h2>
                      <h5>Flat 20% Off</h5>
                      <a className="btn btn-explore" href="#" role="button">
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div
                    className="love-box"
                    style={{ backgroundImage: "url(images/lovbg3.png)" }}
                  >
                    <div className="love-left">
                      <img
                        src="./images/lov-volimg.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="love-right">
                      <h5>Off-the rock</h5>
                      <h2>Fashion Store</h2>
                      <h5>Flat 20% Off</h5>
                      <a className="btn btn-explore" href="#" role="button">
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5 pb-4">
              <div className="heading text-white text-center">How it Works</div>
              <p className="text-center text-white">
                VOOLAY-VOO “(what) do you want (to do)?” A Collaborative,
                Social, Marketplace in the palm of your hand that creates an
                interdependent and connected community of individuals who
                actively engage local businesses and promoters of events and
                services. VOOLAY-VOO provides users notifications of events,
                activities, and collaborative efforts of businesses and
                promoters whom they follow.{" "}
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="howbox">
                <div className="how-icon">
                  <Image
                    width={133}
                    height={133}
                    src="/images/how-icon-1.png"
                    alt=""
                  />
                </div>
                <div className="howhd">
                  Choose your <br /> interest
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="howbox">
                <div className="how-icon">
                  <Image
                    width={133}
                    height={133}
                    src="/images/how-icon-2.png"
                    alt=""
                  />
                </div>
                <div className="howhd">
                  Turn on your location and notification{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="howbox">
                <div className="how-icon">
                  <Image
                    width={133}
                    height={133}
                    src="/images/how-icon-3.png"
                    alt=""
                  />
                </div>
                <div className="howhd">
                  Receive Notifications of Events, and activities from your
                  favorite Business &Promotors
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="howbox">
                <div className="how-icon">
                  <Image
                    width={133}
                    height={133}
                    src="/images/how-icon-4.png"
                    alt=""
                  />
                </div>
                <div className="howhd">
                  Share with Friends and on social media.
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center mt-4">
              <Link
                className="btn btn-learnmore"
                href={"/how-it-works"}
                role="button"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading mb-3">
                {" "}
                Brands <span> To Explore </span>{" "}
              </div>
            </div>
            <div className="col-lg-12">
              <div id="brand-slider" className="owl-carousel">
                <div className="item">
                  <div className="brand-box">
                    <div className="brand-logo">
                      <div className="brand-heart">
                        <form>
                          <input
                            type="checkbox"
                            name="favorite"
                            id="favorite"
                          />
                          <label htmlFor="favorite">
                            <img
                              className="brand-logo-heart"
                              src="./images/bookmark.png"
                              alt=""
                            />
                            <img
                              className="brand-logo-heart-fill"
                              src="./images/bookmark-2.png"
                              alt=""
                            />
                          </label>
                        </form>
                      </div>
                      <img src="./images/brandimg-1.png" alt="" />
                    </div>
                    <div className="brand-heading">Lobster Dogs Food Truck</div>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="brand-box">
                    <div className="brand-logo">
                      <div className="brand-heart">
                        <form>
                          <input
                            type="checkbox"
                            name="favorite"
                            id="favorite"
                          />
                          <label htmlFor="favorite">
                            <img
                              className="brand-logo-heart"
                              src="./images/bookmark.png"
                              alt=""
                            />
                            <img
                              className="brand-logo-heart-fill"
                              src="./images/bookmark-2.png"
                              alt=""
                            />
                          </label>
                        </form>
                      </div>
                      <img src="./images/brandimg-2.png" alt="" />
                    </div>
                    <div className="brand-heading">Lobster Dogs Food Truck</div>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="brand-box">
                    <div className="brand-logo">
                      <div className="brand-heart">
                        <form>
                          <input
                            type="checkbox"
                            name="favorite"
                            id="favorite"
                          />
                          <label htmlFor="favorite">
                            <img
                              className="brand-logo-heart"
                              src="./images/bookmark.png"
                              alt=""
                            />
                            <img
                              className="brand-logo-heart-fill"
                              src="./images/bookmark-2.png"
                              alt=""
                            />
                          </label>
                        </form>
                      </div>
                      <img src="./images/brandimg-3.png" alt="" />
                    </div>
                    <div className="brand-heading">Lobster Dogs Food Truck</div>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="brand-box">
                    <div className="brand-logo">
                      <div className="brand-heart">
                        <form>
                          <input
                            type="checkbox"
                            name="favorite"
                            id="favorite"
                          />
                          <label htmlFor="favorite">
                            <img
                              className="brand-logo-heart"
                              src="./images/bookmark.png"
                              alt=""
                            />
                            <img
                              className="brand-logo-heart-fill"
                              src="./images/bookmark-2.png"
                              alt=""
                            />
                          </label>
                        </form>
                      </div>
                      <img src="./images/brandimg-4.png" alt="" />
                    </div>
                    <div className="brand-heading">Lobster Dogs Food Truck</div>
                    <a className="btn btn-viewmore" href="#" role="button">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="eventnear-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading mb-3">
                {" "}
                Events <span> Near You </span>{" "}
              </div>
            </div>
            <div className="col-lg-12">
              <div id="eventnear-slider" className="owl-carousel">
                <div className="item">
                  <div className="event-brand-box">
                    <div className="brand-logo">
                      <span>$1</span>
                      <img src="./images/near-event1.png" alt="" />
                    </div>
                    <div className="event-pad">
                      <h6>Lobster Dogs Food Truck</h6>
                      <p>
                        An evening with inspirational vibes, curated for your
                        enjoyment and listening pleasure.
                      </p>
                      <div className="point-icon">
                        <span>
                          <img src="./images/location-dot.png" alt="" /> miles
                          away
                        </span>
                        <span>
                          <img src="./images/calendar.png" alt="" /> April 04,
                          2023{" "}
                        </span>
                        <span>
                          <img src="./images/watch.png" alt="" /> 7:50 AM to
                          8:00PM{" "}
                        </span>
                      </div>

                      <a
                        className="btn btn-viewmore-border"
                        href="#"
                        role="button"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="event-brand-box">
                    <div className="brand-logo">
                      <span>Free</span>
                      <img src="./images/near-event2.png" alt="" />
                    </div>
                    <div className="event-pad">
                      <h6>Lobster Dogs Food Truck</h6>
                      <p>
                        An evening with inspirational vibes, curated for your
                        enjoyment and listening pleasure.
                      </p>
                      <div className="point-icon">
                        <span>
                          <img src="./images/location-dot.png" alt="" /> miles
                          away
                        </span>
                        <span>
                          <img src="./images/calendar.png" alt="" /> April 04,
                          2023{" "}
                        </span>
                        <span>
                          <img src="./images/watch.png" alt="" /> 7:50 AM to
                          8:00PM{" "}
                        </span>
                      </div>

                      <a
                        className="btn btn-viewmore-border"
                        href="#"
                        role="button"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="event-brand-box">
                    <div className="brand-logo">
                      <span>$8</span>
                      <img src="./images/near-event3.png" alt="" />
                    </div>
                    <div className="event-pad">
                      <h6>Lobster Dogs Food Truck</h6>
                      <p>
                        An evening with inspirational vibes, curated for your
                        enjoyment and listening pleasure.
                      </p>
                      <div className="point-icon">
                        <span>
                          <img src="./images/location-dot.png" alt="" /> miles
                          away
                        </span>
                        <span>
                          <img src="./images/calendar.png" alt="" /> April 04,
                          2023{" "}
                        </span>
                        <span>
                          <img src="./images/watch.png" alt="" /> 7:50 AM to
                          8:00PM{" "}
                        </span>
                      </div>

                      <a
                        className="btn btn-viewmore-border"
                        href="#"
                        role="button"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="event-brand-box">
                    <div className="brand-logo">
                      <span>Free</span>
                      <img src="./images/near-event1.png" alt="" />
                    </div>
                    <div className="event-pad">
                      <h6>Lobster Dogs Food Truck</h6>
                      <p>
                        An evening with inspirational vibes, curated for your
                        enjoyment and listening pleasure.
                      </p>
                      <div className="point-icon">
                        <span>
                          <img src="./images/location-dot.png" alt="" /> miles
                          away
                        </span>
                        <span>
                          <img src="./images/calendar.png" alt="" /> April 04,
                          2023{" "}
                        </span>
                        <span>
                          <img src="./images/watch.png" alt="" /> 7:50 AM to
                          8:00PM{" "}
                        </span>
                      </div>

                      <a
                        className="btn btn-viewmore-border"
                        href="#"
                        role="button"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="subscribe-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center heading">
              <span> Get latest updates from VoolayVoo? </span>
            </div>
            <div className="col-lg-6">
              <form className="d-flex sub-srchbox mt-2">
                <input
                  className="suscribe-srch"
                  type="mail"
                  placeholder="Enter your Email"
                />
                <button className="subscribe-btn" type="submit">
                  {" "}
                  Subscribe{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center heading mb-5">
              <span>Testimonials</span>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="testi-box">
                <div className="testi-img">
                  <Image
                    width={38}
                    height={38}
                    src="/images/profile.png"
                    alt=""
                  />
                </div>
                <div className="testi-text">
                  <div className="testi-name-date">
                    <span>Elina mary</span>
                    <span>10:42 am</span>
                  </div>
                  <div className="testi-text-box">
                    <h5>Elina mary</h5>
                    <p>Crazy venue. Enjoyed alot!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="testi-box">
                <div className="testi-img">
                  <Image
                    width={38}
                    height={38}
                    src="/images/profile.png"
                    alt=""
                  />
                </div>
                <div className="testi-text">
                  <div className="testi-name-date">
                    <span>Elina mary</span>
                    <span>10:42 am</span>
                  </div>
                  <div className="testi-text-box">
                    <h5>Elina mary</h5>
                    <p>Crazy venue. Enjoyed alot!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="testi-box">
                <div className="testi-img">
                  <Image
                    width={38}
                    height={38}
                    src="/images/profile.png"
                    alt=""
                  />
                </div>
                <div className="testi-text">
                  <div className="testi-name-date">
                    <span>Elina mary</span>
                    <span>10:42 am</span>
                  </div>
                  <div className="testi-text-box">
                    <h5>Elina mary</h5>
                    <p>Crazy venue. Enjoyed alot!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="testi-box">
                <div className="testi-img">
                  <Image
                    width={38}
                    height={38}
                    src="/images/profile.png"
                    alt=""
                  />
                </div>
                <div className="testi-text">
                  <div className="testi-name-date">
                    <span>Elina mary</span>
                    <span>10:42 am</span>
                  </div>
                  <div className="testi-text-box">
                    <h5>Elina mary</h5>
                    <p>Crazy venue. Enjoyed alot!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="testi-box">
                <div className="testi-img">
                  <Image
                    width={38}
                    height={38}
                    src="/images/profile.png"
                    alt=""
                  />
                </div>
                <div className="testi-text">
                  <div className="testi-name-date">
                    <span>Elina mary</span>
                    <span>10:42 am</span>
                  </div>
                  <div className="testi-text-box">
                    <h5>Elina mary</h5>
                    <p>Crazy venue. Enjoyed alot!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="testi-box">
                <div className="testi-img">
                  <Image
                    width={38}
                    height={38}
                    src="/images/profile.png"
                    alt=""
                  />
                </div>
                <div className="testi-text">
                  <div className="testi-name-date">
                    <span>Elina mary</span>
                    <span>10:42 am</span>
                  </div>
                  <div className="testi-text-box">
                    <h5>Elina mary</h5>
                    <p>Crazy venue. Enjoyed alot!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="refer-sec">
        <div className="container">
          <div className="row g-0 refer-bg">
            <div className="col-lg-2 col-md-2 img-right">
              <Image
                width={159}
                height={331}
                src="/images/refer-img.png"
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-7">
              <div className="referbox-text">
                <h1 style={{ fontFamily: "Montserrat; font-weight: 700" }}>
                  Refer & Earn Rewards
                </h1>
                <h2>Invite friends & business</h2>
                <p>Refer a Friend and earn exciting rewards!</p>
                <a className="btn btn-viewmore" href="#" role="button">
                  Refer Friend
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-3">
              <Image
                width={356}
                height={328}
                src="/images/refer-img2.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
