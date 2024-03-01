import Image from "next/image";

const Card = () => {
  return (
    <>
      <div className="item">
        <div className="event-brand-box">
          <div className="brand-logo">
            <img src="../images/near-event1.png" alt="" />
            <div className="event-price"> $5 </div>
          </div>
          <div className="event-pad">
            <h6>Lobster Dogs Food Truck</h6>
            <p>
              An evening with inspirational vibes, curated for your enjoyment
              and listening pleasure.
            </p>
            <div className="point-icon">
              <span>
                <img src="../images/location-dot.png" alt="" /> miles away
              </span>
              <span>
                <img src="../images/calendar.png" alt="" /> April 04, 2023{" "}
              </span>
              <span>
                <img src="../images/watch.png" alt="" /> 7:50 AM to 8:00PM{" "}
              </span>
            </div>

            <a className="btn btn-viewmore-border" href="#" role="button">
              View More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
