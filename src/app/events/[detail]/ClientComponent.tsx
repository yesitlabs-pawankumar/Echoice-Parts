"use client";
import { useState } from "react";
import Image from "next/image";
import Voopons from "./components/voopons";
import AddCard from "@/app/voopons/[detail]/components/Modal/addCard";
import Collaborator from "@/app/voopons/[detail]/components/Modal/collaborator";
import { DateTime } from "luxon";
import Link from "next/link";
import { BASE_URL } from "@/constant/constant";
import Quantity from "@/components/Quantity";
import Carousel from "@/components/Carousel";
import { useAuth } from "@/app/UserProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ClientComponent = ({ eventDetail }) => {
  const [open, setOpen] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [eventPrice, setEventPrice] = useState<number>(
    eventDetail?.events_price || 0
  );
  const { isAuthenticated, userDetails } = useAuth();
  const router = useRouter();
  let pathName = usePathname();
  const searchParams = useSearchParams();
  const tempPathName =
    pathName + `?promoter_id=${searchParams.get("promoter_id")}`;

  const pageUrl = window.location.href;
  const pageTitle = document.title;
  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    pageUrl
  )}`;
  const twitterShareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    pageUrl
  )}&text=${encodeURIComponent(pageTitle)}`;
  const instagramShareLink = `https://www.instagram.com/share?url=${encodeURIComponent(
    pageUrl
  )}`;
  const snapchatShareLink = `https://www.snapchat.com/add/your-snapcode`; // Replace with your Snapcode link
  const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    pageUrl
  )}`;
  const whatsappShareLink = `https://wa.me/?text=${encodeURIComponent(
    `${pageTitle} - ${pageUrl}`
  )}`;
  const handleQuantity = (quantity) => {
    setEventPrice(quantity * eventDetail?.events_price);
  };
  const handleBookNow = () => {
    if (!isAuthenticated) {
      router.push(`/login?lastPath=${tempPathName}`);
    } else {
      setOpenCard(true);
    }
  };

  return (
    <>
      <section className="details-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="slider-box">
                <img
                  className="w-100"
                  src={
                    eventDetail?.eventsimage[0]?.image_name
                      ? `${BASE_URL}/${eventDetail?.eventsimage[0]?.image_name}`
                      : "/images/banners/slide1.png"
                  }
                  alt=""
                  id="product-main-image"
                />

                <div
                  id="pro-slider"
                  className="product-image-slider owl-carousel"
                >
                  <img
                    src="/images/banners/slide1.png"
                    alt=""
                    className="image-list image-list-bdr w-100"
                  />
                  <img
                    src="/images/banners/slide2.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <img
                    src="/images/banners/slide3.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <img
                    src="/images/banners/slide1.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <img
                    src="/images/banners/slide2.png"
                    alt=""
                    className="image-list w-100"
                  />
                  <img
                    src="/images/banners/slide3.png"
                    alt=""
                    className="image-list w-100"
                  />
                </div>

                {/* <Carousel images={eventDetail?.eventsimage} /> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="details-text-box">
                <h2 className="title-capitilize">
                  {" "}
                  {eventDetail?.events_name}
                </h2>
                <p className="paragraph-wrap">
                  {eventDetail?.events_description}{" "}
                </p>
                <div className="colibraters-rating">
                  <div className="collaborators">
                    <span>
                      <Image
                        width={31}
                        height={31}
                        src="/images/collabo-icon.png"
                        alt="images"
                        className="img-fluid"
                      />
                    </span>
                    <span className="col-font" onClick={() => setOpen(true)}>
                      Collaborator(s):{" "}
                    </span>
                    <span>
                      {eventDetail?.collaborator_data?.length > 0 &&
                        eventDetail?.collaborator_data.map(
                          (collaborator, idx) => {
                            if (idx < 3) {
                              return (
                                <Image
                                  key={collaborator?.id}
                                  width={31}
                                  height={31}
                                  src={
                                    collaborator?.promoter_data?.profile_image
                                      ? `${BASE_URL}/${collaborator?.promoter_data?.profile_image}`
                                      : "/images/colebr-1.png"
                                  }
                                  alt="images"
                                  className="collabeIcon"
                                />
                              );
                            }
                          }
                        )}

                      {eventDetail?.collaborator_data?.length > 3 && (
                        <div className="more">
                          {" "}
                          +{eventDetail?.collaborator_data?.length - 3}{" "}
                        </div>
                      )}
                    </span>
                  </div>
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

                <Collaborator
                  open={open}
                  setOpen={setOpen}
                  data={eventDetail?.collaborator_data}
                />
                <AddCard open={openCard} setOpen={setOpenCard} />

                <div className="row mt-2 align-items-center">
                  <div className="col-lg-7 col-md-6">
                    <div className="quantity">
                      <h4> Quantity:</h4>
                      <Quantity updateQuantity={handleQuantity} />
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                    <div className="price-box">
                      <h4>
                        {" "}
                        Price: <span> ${eventPrice} </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-7 col-md-6">
                    <div className="valid-thru">
                      <h4> Date & Time </h4>
                      <span>
                        {eventDetail?.events_date &&
                          DateTime.fromFormat(
                            eventDetail?.events_date,
                            "yyyy-MM-dd"
                          ).toFormat("MMM dd, yyyy")}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                    <div className="location-box">
                      <h4> Location </h4>
                      <span> {eventDetail?.location}</span>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 align-items-center">
                  <div className="col-lg-8 col-md-6">
                    <a
                      onClick={handleBookNow}
                      className="btn btn-learnmore"
                      role="button"
                    >
                      Book Now
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="share-media">
                      <span>
                        {" "}
                        <Image
                          width={24}
                          height={24}
                          src="/images/share.svg"
                          alt=""
                        />{" "}
                        Share with friends{" "}
                      </span>
                      <div className="show-social">
                        <span>
                          <Link
                            href={twitterShareLink}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width={17}
                              height={16}
                              src="/images/social-icon-1.png"
                              alt="images"
                            />
                          </Link>
                        </span>
                        <span>
                          <Link
                            href={whatsappShareLink}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width={17}
                              height={16}
                              src="/images/social-icon-2.png"
                              alt="images"
                            />
                          </Link>
                        </span>
                        <span>
                          <Link
                            href={instagramShareLink}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width={17}
                              height={16}
                              src="/images/social-icon-3.png"
                              alt="images"
                            />
                          </Link>
                        </span>
                        <span>
                          <Link
                            href={facebookShareLink}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width={17}
                              height={16}
                              src="/images/social-icon-4.png"
                              alt="images"
                            />
                          </Link>
                        </span>
                        <span>
                          <Link
                            href={snapchatShareLink}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width={17}
                              height={16}
                              src="/images/social-icon-5.png"
                              alt="images"
                            />
                          </Link>
                        </span>
                        <span>
                          <Link
                            href={linkedinShareLink}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              width={17}
                              height={16}
                              src="/images/social-icon-6.png"
                              alt="images"
                            />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-sec">About this Event</div>
              <p className="paragraph-wrap">{eventDetail?.events_about}</p>
              <div className="heading-sec">Event Highlights</div>
              <p className="paragraph-wrap">{eventDetail?.events_highlights}</p>
              {/* <ul>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.Lorem Ipsum is{" "}
                </li>
                <li>
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry&apos;s standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </section>

      <Voopons />
    </>
  );
};

export default ClientComponent;
