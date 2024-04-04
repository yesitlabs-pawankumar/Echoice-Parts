"use client";
import { Coordinates } from "@/app/voopons/ClientComponent";
import { BASE_URL } from "@/constant/constant";
import {
  calculateDistanceInMiles,
  convertTo12HourFormat,
} from "@/relatedFunction/eventFunction";
import { DateTime } from "luxon";
import Image from "next/image";
import { useEffect, useState } from "react";

const Card = ({ cardData }: any) => {
  const [eventAway, setEventAway] = useState<number | null>(null);
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await new Promise<Coordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error)
          );
        });

        if (cardData && position) {
          const targetLocation: Coordinates = {
            latitude: cardData?.["latitude"],
            longitude: cardData?.["longitude"],
          };
          setEventAway(calculateDistanceInMiles(position, targetLocation));
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    getCurrentLocation();
  }, [cardData]);
  console.log("cardData", cardData);
  return (
    // <div className="item">
    <div className="event-brand-box">
      <div className="brand-logo">
        <Image
          width={290}
          height={226}
          alt=""
          style={{ objectFit: "cover" }}
          src={
            cardData?.eventimage?.image_name
              ? `${BASE_URL}/${cardData?.eventimage?.image_name}`
              : "/images/near-event1.png"
          }
        />
        <div className="event-price">
          {" "}
          $ {cardData?.events_price === "0"
            ? "Free"
            : cardData?.events_price}{" "}
        </div>
      </div>
      <div className="event-pad">
        <h6 className="title-capitilize">{cardData?.events_name}</h6>
        <p className="truncate-text">{cardData?.events_description}</p>
        <div className="point-icon">
          <span>
            <img src="/images/location-dot.png" alt="" /> {eventAway} miles away
          </span>
          {cardData?.events_date && (
            <span>
              <img src="/images/calendar.png" alt="" />{" "}
              {DateTime.fromFormat(
                cardData?.events_date,
                "yyyy-MM-dd"
              ).toFormat("MMMM dd, yyyy")}{" "}
            </span>
          )}
          {cardData?.events_start_time && (
            <span>
              <img src="/images/watch.png" alt="" />{" "}
              {convertTo12HourFormat(cardData?.events_start_time)} to{" "}
              {convertTo12HourFormat(cardData?.events_end_time)}{" "}
            </span>
          )}
        </div>

        <a
          className="btn btn-viewmore-border"
          href={`/events/${cardData?.id}?promoter_id=${cardData?.promoter_id}`}
          role="button"
        >
          View More
        </a>
      </div>
    </div>
    // </div>
  );
};

export default Card;
