"use client";
import { useState } from "react";
import Image from "next/image";
import Collaborator from "@/app/voopons/[detail]/components/Modal/collaborator";
import { DateTime } from "luxon";
import Link from "next/link";
import { BASE_URL } from "@/constant/constant";
import Quantity from "@/components/Quantity";
import Carousel from "@/components/Carousel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ShowQrCode from "@/components/Modal/ShowQrCode";
import { Rating } from "@mui/material";

const ClientComponent = ({ eventDetail, qrCode }) => {
  const [open, setOpen] = useState(false);
  const [openQrCode, setOpenQrCode] = useState(false);
  let pathName = usePathname();

  const searchParams = useSearchParams();
  const tempPathName =
    pathName + `?promoter_id=${searchParams.get("promoter_id")}`;
  let pageUrl = "";
  let pageTitle;
  if (typeof window !== "undefined") {
    pageUrl = window.location.href;
    pageTitle = document?.title;
  }

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

  const handleQrCode = () => {
    setOpenQrCode(true);
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
                    eventDetail?.eventsimage?.[0]?.image_name
                      ? `${BASE_URL}/${eventDetail?.eventsimage[0]?.image_name}`
                      : "/images/banners/slide1.png"
                  }
                  alt=""
                  id="product-main-image"
                />

                <Carousel
                  itemsList={eventDetail?.eventsimage}
                  RenderComponent={() => <img />}
                  itemsPerPage={4}
                  isImage={true}
                />
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
                  {eventDetail?.rating_data &&
                    eventDetail?.rating_data.length > 1 && (
                      <div className="rating-box">
                        {" "}
                        {eventDetail?.rating_data?.[0].toFixed(1)}{" "}
                        <span>
                          <Rating
                            name="read-star"
                            value={eventDetail?.rating_data?.[0].toFixed(2)}
                            readOnly
                            precision={0.5}
                          />
                        </span>{" "}
                        ({eventDetail?.rating_data?.[1]})
                      </div>
                    )}
                </div>

                <Collaborator
                  open={open}
                  setOpen={setOpen}
                  data={eventDetail?.collaborator_data}
                />
                <ShowQrCode
                  open={openQrCode}
                  setOpen={setOpenQrCode}
                  codeData={qrCode}
                />

                <div className="row mt-2 align-items-center">
                  <div className="col-lg-7 col-md-6">
                    <div className="quantity">
                      <h4>
                        {" "}
                        Quantity:
                        <span> {eventDetail?.event_quantity}</span>
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                    <div className="price-box">
                      <h4>
                        {" "}
                        Price:{" "}
                        <span>
                          {" "}
                          ${" "}
                          {eventDetail.hasOwnProperty("events_price") &&
                          Number(eventDetail?.events_price) === 0
                            ? "Free"
                            : Number(eventDetail?.events_price)}{" "}
                        </span>
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
                      onClick={handleQrCode}
                      className="btn btn-learnmore"
                      role="button"
                    >
                      Event QR
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
                              width={24}
                              height={24}
                              src="/images/social-icon-1.svg"
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
                              width={24}
                              height={24}
                              src="/images/social-icon-2.svg"
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
                              width={24}
                              height={24}
                              src="/images/social-icon-3.svg"
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
                              width={24}
                              height={24}
                              src="/images/social-icon-4.svg"
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
                              width={24}
                              height={24}
                              src="/images/social-icon-5.svg"
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
                              width={24}
                              height={24}
                              src="/images/social-icon-6.svg"
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientComponent;
