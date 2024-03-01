import Image from "next/image";
import Tabs from "@/app/promoters/[detail]/components/tabs";

const Detail = () => {
  return (
    <>
      <section className="details-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="slider-box">
                <Image
                  width={596}
                  height={315}
                  className="w-100"
                  src="/images/banners/slide1.png"
                  alt=""
                  id="product-main-image"
                />
                <div
                  id="pro-slider"
                  className="product-image-slider owl-carousel"
                >
                  <Image
                    src="../images/banners/slide1.png"
                    alt=""
                    className="image-list image-list-bdr w-100"
                  />
                  <Image
                    src="../images/banners/slide2.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <Image
                    src="../images/banners/slide3.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <Image
                    src="../images/banners/slide1.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <Image
                    src="../images/banners/slide2.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <Image
                    src="../images/banners/slide3.png"
                    alt=""
                    className="image-list w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="details-text-box-business">
                <div className="busines-logo-hd mb-2">
                  <span>
                    <Image
                      width={58}
                      height={56}
                      src="/images/business-logo.png"
                      alt=""
                    />
                  </span>
                  <h1>Lobster Dogs Food Truck </h1>
                </div>
                <p>
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing.
                </p>
                <div className="row mb-3">
                  <div className="col-lg-7 col-md-6">
                    <div className="flowers">
                      <span>
                        <Image
                          width={33}
                          height={20}
                          src="/images/followers-icon.png"
                          alt=""
                        />{" "}
                        174 Followers
                      </span>
                      <span>
                        <a href="#" className="followers-btn">
                          Follow
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                    <div className="rating-box">
                      {" "}
                      4.0
                      <span>
                        <Image
                          width={27}
                          height={25}
                          src="/images/star-rate.png"
                          alt=""
                        />
                      </span>
                      <span>
                        <Image
                          width={27}
                          height={25}
                          src="/images/star-rate.png"
                          alt=""
                        />
                      </span>
                      <span>
                        <Image
                          width={27}
                          height={25}
                          src="/images/star-rate.png"
                          alt=""
                        />
                      </span>
                      <span>
                        <Image
                          width={27}
                          height={25}
                          src="/images/star-rate.png"
                          alt=""
                        />
                      </span>
                      <span>
                        <Image
                          width={27}
                          height={25}
                          src="/images/star-rate-blank.png"
                          alt=""
                        />
                      </span>
                      (2.5K)
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-7 col-md-6">
                    <div className="websites">
                      <Image
                        width={21}
                        height={21}
                        src="/images/world.svg"
                        alt=""
                      />{" "}
                      <a href="#">www.Lobsterdogesfoodtruck.com</a>{" "}
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                    <div className="direction">
                      <Image
                        width={25}
                        height={25}
                        src="/images/direction.png"
                        alt=""
                      />{" "}
                      <a href="#">Direction</a>{" "}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-lg-7 col-md-6">
                    <div className="cate-subcat">
                      <b> Category: </b> Lorem Ipsum
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                    <div className="cate-subcat">
                      <b> Sub-Category: </b>Lorem Ipsum
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Tabs tabs={[]} promoterId={0} />
    </>
  );
};

export default Detail;
