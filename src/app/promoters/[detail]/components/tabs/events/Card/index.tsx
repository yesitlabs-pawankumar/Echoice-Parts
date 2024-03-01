import { BASE_URL } from "@/constant/constant";
import { convertTo12HourFormat } from "@/relatedFunction/eventFunction";
import { DateTime } from "luxon";
import Image from "next/image";
const Card = ({ cardData }: any) => {
  return (
    <>
      <div className="col-lg-3 col-md-6">
        <div className="event-brand-box">
          <div className="brand-logo">
            <img
              height={223}
              style={{ objectFit: "cover" }}
              src={
                cardData?.eventimage?.image_name
                  ? `${BASE_URL}/${cardData?.eventimage?.image_name}`
                  : "/images/near-event1.png"
              }
              alt=""
            />
            <div className="event-price"> ${cardData?.events_price} </div>
          </div>
          <div className="event-pad">
            <h6 className="title-capitilize">{cardData?.events_name}</h6>
            <p className="truncate-text">{cardData?.events_description}</p>
            <div className="point-icon">
              <span>
                <img src="/images/location-dot.png" alt="" />{" "}
                {cardData?.event_away_distance || null} miles away{" "}
              </span>
              <span>
                <img src="/images/calendar.png" alt="" />{" "}
                {DateTime.fromFormat(
                  cardData?.events_date,
                  "yyyy-MM-dd"
                ).toFormat("MMMM dd, yyyy")}{" "}
              </span>
              <span>
                <img src="/images/watch.png" alt="" />
                {convertTo12HourFormat(cardData?.events_start_time)} to{" "}
                {convertTo12HourFormat(cardData?.events_end_time)}{" "}
              </span>
            </div>
            <a
              className="btn btn-viewmore-border"
              href={`/events/${cardData.id}?promoter_id=${cardData.promoter_id}`}
              role="button"
            >
              View More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
